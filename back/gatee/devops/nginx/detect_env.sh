#!/bin/bash

EXIST_BLUE=$(docker-compose -p ${DOCKER_APP_NAME}-blue -f docker-compose.blue.yaml ps | grep Up)

# 컨테이너 스위칭
if [ -z "$EXIST_BLUE" ]; then
    echo "blue"
else
    echo "green"
fi
