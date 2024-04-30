#!/bin/bash

# 배포할 환경 변수 설정 (예: blue 또는 green)
DEPLOY_ENV=$1

# Nginx 설정 파일 경로 설정
NGINX_CONF="/home/ubuntu/nginx.conf"

# 블루 서버 설정
BLUE_SERVER="gatee-api-blue:8080"

# 그린 서버 설정
GREEN_SERVER="gatee-api-green:8081"

# 환경에 따라 Nginx 설정 변경
if [ "$DEPLOY_ENV" == "blue" ]; then
  cp /etc/nginx/nginx.${$DEPLOY_ENV}.conf /etc/nginx/nginx.conf
  echo "Switched to BLUE server configuration."
else
  echo "Unknown deployment environment: $DEPLOY_ENV"
  cp /etc/nginx/nginx.${$DEPLOY_ENV}.conf /etc/nginx/nginx.conf
  echo "Switched to GREEN server configuration."
fi

# Docker 컨테이너 내에서 Nginx 설정 리로드
CONTAINER_NAME="proxy-server"
docker exec $CONTAINER_NAME nginx -s reload
