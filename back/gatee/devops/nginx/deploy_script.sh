#!/bin/bash

cd $(dirname $0)
cd ../..
set -x

# Blue 를 기준으로 현재 떠있는 컨테이너를 체크한다.
ls
pwd
DOCKER_APP_NAME="gatee-api"
EXIST_BLUE=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yaml ps | grep Up || true)
# 컨테이너 스위칭
if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    docker-compose -p gatee-api-blue -f docker-compose.blue.yaml up -d
    BEFORE_COMPOSE_COLOR="green"
    AFTER_COMPOSE_COLOR="blue"
else
    echo "green up"
    docker-compose -p ${DOCKER_APP_NAME}-green -f docker-compose.green.yaml up -d
    BEFORE_COMPOSE_COLOR="blue"
    AFTER_COMPOSE_COLOR="green"
fi

sleep 10

# 새로운 컨테이너가 제대로 떴는지 확인
EXIST_AFTER=$(docker-compose -p ${DOCKER_APP_NAME}-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps | grep Up)
if [ -n "$EXIST_AFTER" ]; then
  # nginx.config를 컨테이너에 맞게 변경해주고 reload 한다
  docker exec proxy-server cp /etc/nginx/nginx.${AFTER_COMPOSE_COLOR}.conf /etc/nginx/nginx.conf
  docker exec proxy-server nginx -s reload

  # 이전 컨테이너 종료
  docker-compose -p ${DOCKER_APP_NAME}-${BEFORE_COMPOSE_COLOR} -f docker-compose.${BEFORE_COMPOSE_COLOR}.yaml down
  echo "$BEFORE_COMPOSE_COLOR down"
fi
