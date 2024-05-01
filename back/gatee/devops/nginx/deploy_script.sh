set -ex

# 현재 디렉터리 출력
pwd
# 상위 디렉터리로 변경
cd $(dirname $0)
pwd
cd ../..
pwd
# 현재 디렉터리 내 파일 목록 출력
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
HEALTHY_COUNT=$(docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps -q | xargs docker inspect --format='{{.State.Health.Status}}' | grep -c "healthy")
CONTAINER_COUNT=$(docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps -q | wc -l)

# 'healthy' 상태의 컨테이너 수를 확인하여 모두 'healthy' 상태라면 nginx 설정 변경 및 이전 환경 종료
if [ "$HEALTHY_COUNT" -eq "$CONTAINER_COUNT" ]; then
  echo "All containers are healthy."
  # nginx.config를 컨테이너에 맞게 변경하고 reload 함
  docker exec proxy-server cp /etc/nginx/nginx.${AFTER_COMPOSE_COLOR}.conf /etc/nginx/nginx.conf
  docker exec proxy-server nginx -s reload

  # 이전 컨테이너 종료
  docker-compose -p ${DOCKER_APP_NAME}-${BEFORE_COMPOSE_COLOR} -f docker-compose.${BEFORE_COMPOSE_COLOR}.yaml down
  echo "$BEFORE_COMPOSE_COLOR down"
else
  echo "Not all containers are healthy yet. $HEALTHY_COUNT/$CONTAINER_COUNT"
  # 롤백 로직: 실패할 경우 새로운 환경을 내리고 삭제
  docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml down
  echo "${AFTER_COMPOSE_COLOR} deployment failed. Rolled back."
fi
