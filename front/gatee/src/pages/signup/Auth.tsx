import React, { useEffect } from 'react';
import { useMemberStore } from "@store/useMemberStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupAuth = () => {
  const navigate = useNavigate();
  const tokenUrl: string = `https://kauth.kakao.com/oauth/token`
  const kakaoJavaScriptApiKey: string | undefined = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
  const web: string = "http://localhost:3000/auth"
  const mobile_home: string = "http://192.168.35.47:3000/auth"
  const mobile_ssafy: string = "http://70.12.247.24:3000/auth"

  // 토큰 상태 관리
  const { setAccessToken } = useMemberStore();

  // 인가 코드 받기
  const code: string | null = new URL(window.location.href).searchParams.get('code');

  // 토큰 받기
  const getAccessToken = () => {
    if (kakaoJavaScriptApiKey === undefined || code === null) {
      navigate("/auth");
    } else {
      const formData = new URLSearchParams();
      formData.append("grant_type", "authorization_code");
      formData.append("client_id", kakaoJavaScriptApiKey);
      formData.append("redirect_uri", web);
      formData.append("code", code);

      axios.post(
        tokenUrl, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          }
        }
      ).then(response => {
        const kakao_access_token: string = response.data.access_token;
        console.log(response.data.access_token);
        console.log(kakao_access_token);

        axios.post(
          'https://gaty.duckdns.org/api/auth/kakao/login', null,  {
            headers: {
              "Kakao-Access-Token": kakao_access_token,
              // "Access-Control-Allow-Origin": "https://gaty.duckdns.org",
              // "Content-Type": "application/json;charset=UTF-8",
              // "Accept": "application/json",

              // "Access-Control-Allow-Origin": "http://localhost:3000",
              // "Access-Control-Allow-Credentials": "true",
              // "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
              // "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
              // "Access-Control-Max-Age": 86400,
            }
          }
        ).then(response => {
          console.log(response.headers.authorization);
          const token = response.headers.authorization.split(' ')[1];
          console.log(token)
          setAccessToken(token);
          navigate("/signup");
        }).catch(error => {
          console.log(error.response);
        })
      }).catch(error => {
        console.error(error);
      })
    }
  }

  useEffect(() => {
    if (code) {
      getAccessToken();
    }
  }, [code]);

  return (
    <div className="signup-auth">
      <span className="signup-auth__title">
        로딩중...
      </span>
    </div>
  );
};

export default SignupAuth;