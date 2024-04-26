#!/bin/bash

# 배포할 환경 변수 설정 (예: blue 또는 green)
DEPLOY_ENV=$1

pwd
ls

# Nginx 설정 파일 경로 설정
NGINX_CONF="./nginx.conf"

# 블루 서버 설정
BLUE_SERVER="gatee-api-blue:8080"

# 그린 서버 설정
GREEN_SERVER="gatee-api-green:8081"

# 환경에 따라 Nginx 설정 변경
if [ "$DEPLOY_ENV" == "blue" ]; then
  sed -i "s|server .*;|server $BLUE_SERVER;|g" $NGINX_CONF
elif [ "$DEPLOY_ENV" == "green" ]; then
  sed -i "s|server .*;|server $GREEN_SERVER;|g" $NGINX_CONF
else
  echo "Unknown deployment environment: $DEPLOY_ENV"
  exit 1
fi
