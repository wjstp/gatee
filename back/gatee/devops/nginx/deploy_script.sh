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

# 컨테이너가 제대로 작동하는지 확인하기 위해 반환값 체크
RETURN_VAL=$(docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps -q | xargs docker inspect -f '{{ .State.Health.Status }}' | grep -w "healthy" | wc -l)
CONTAINER_COUNT=$(docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps -q | wc -l)

# 'healthy' 상태의 컨테이너 수를 확인하여 모두 'healthy' 상태라면 nginx 설정 변경 및 이전 환경 종료
if [ "$RETURN_VAL" -eq "$CONTAINER_COUNT" ]; then
  echo "All containers are healthy."
  # nginx.config를 컨테이너에 맞게 변경하고 reload 함
  docker exec proxy-server cp /etc/nginx/nginx.${AFTER_COMPOSE_COLOR}.conf /etc/nginx/nginx.conf
  docker exec proxy-server nginx -s reload

  # 이전 컨테이너 종료
  docker-compose -p ${DOCKER_APP_NAME}-${BEFORE_COMPOSE_COLOR} -f docker-compose.${BEFORE_COMPOSE_COLOR}.yaml down
  echo "$BEFORE_COMPOSE_COLOR down"
else
  echo "Not all containers are healthy yet. $RETURN_VAL/$CONTAINER_COUNT"
  # 롤백 로직: 실패할 경우 새로운 환경을 내리고 삭제
  docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml down
  echo "${AFTER_COMPOSE_COLOR} deployment failed. Rolled back."
fi
