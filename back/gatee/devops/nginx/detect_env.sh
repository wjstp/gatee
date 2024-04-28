#!/bin/bash

# detect_env.sh
cd ../../..
# NGINX의 설정 파일 경로 설정
NGINX_CONFIG_FILE="/home/ubuntu/nginx.conf"

# NGINX 설정 파일에서 'upstream springboot_app' 섹션을 검색하여, 현재 활성화된 서버가 블루인지 그린인지 파악
if grep -q "gatee-api-blue" $NGINX_CONFIG_FILE; then
  echo "blue"
elif grep -q "gatee-api-green" $NGINX_CONFIG_FILE; then
  echo "green"
else
  echo "blue"
fi
