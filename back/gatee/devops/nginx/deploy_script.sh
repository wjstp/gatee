set -ex

pwd
cd $(dirname $0)
pwd
cd ../..
pwd
ls

DOCKER_APP_NAME="gatee-api"
EXIST_BLUE=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yaml ps | grep Up || true)

# 컨테이너 업
if [ -z "$EXIST_BLUE" ]; then
  echo "blue up"
  docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yaml up -d
  BEFORE_COMPOSE_COLOR="green"
  AFTER_COMPOSE_COLOR="blue"
else
  echo "green up"
  docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yaml up -d
  BEFORE_COMPOSE_COLOR="blue"
  AFTER_COMPOSE_COLOR="green"
fi

#!/bin/bash

# Health check 만족시까지 기다립니다.
MAX_ATTEMPTS=3
SLEEP_TIME=30
ATTEMPTS=0

echo "Waiting for containers to become healthy..."

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
  RETURN_VAL=$(docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps -q | xargs docker inspect -f '{{ .State.Health.Status }}' | grep -c "healthy")
  CONTAINER_COUNT=$(docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps -q | wc -l)

  if [ "$RETURN_VAL" -eq "$CONTAINER_COUNT" ]; then
    echo "All containers are healthy."
    break
  fi

  echo "Not all containers are healthy yet. Attempt $((ATTEMPTS + 1))/$MAX_ATTEMPTS"
  sleep $SLEEP_TIME
  ATTEMPTS=$((ATTEMPTS + 1))
done

if [ "$RETURN_VAL" -ne "$CONTAINER_COUNT" ]; then
  echo "${AFTER_COMPOSE_COLOR} deployment failed. Starting rollback..."
  docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml down
  echo "${AFTER_COMPOSE_COLOR} 컨테이너를 종료했습니다."
fi

# nginx 설정 변경 및 리로드
docker exec proxy-server cp /etc/nginx/nginx.${AFTER_COMPOSE_COLOR}.conf /etc/nginx/nginx.conf
docker exec proxy-server nginx -s reload

# 이전 컨테이너 종료
docker-compose -p ${DOCKER_APP_NAME}-${BEFORE_COMPOSE_COLOR} -f docker-compose.${BEFORE_COMPOSE_COLOR}.yaml down
echo "${BEFORE_COMPOSE_COLOR} 컨테이너를 종료했습니다."
