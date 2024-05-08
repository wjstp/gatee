import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { kakaoLoginAPI, kakaoTokenAPI } from "@api/kakao";

const SignupAuth = () => {
  const navigate = useNavigate();
  const kakaoJavaScriptKey: string | undefined = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
  const redirectUri: string | undefined = process.env.REACT_APP_API_URL;
  // 인가 코드 가져오기
  const code: string | null = new URL(window.location.href).searchParams.get('code');

  // 인가코드를 받았을 때마다 실행
  useEffect(() => {
    if (code) {
      navigate('/signup');
      // 카카오 로그인
      kakaoLoginAPI(
        {
          grant_type: "authorization_code",
          client_id: kakaoJavaScriptKey,
          redirect_uri: `${redirectUri}/auth`,
          code: code
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        },
        (res: AxiosResponse<any>): void => {
          const kakao_access_token: string = res.data.access_token;

          // 카카오 토큰으로 우리 토큰 발급 받기
          kakaoTokenAPI(
            {
              headers: {
                "Kakao-Access-Token": kakao_access_token
              }
            },
            (res: AxiosResponse<any>): void => {

              // 우리 토큰 로컬 스토리지 저장
              const access_token = res.headers.authorization.split(' ')[1];
              localStorage.setItem("accessToken", access_token);
              
              // 회원가입 페이지로 이동
              navigate('/signup');
            },
          (err: AxiosError<any>): void => {
            console.log(err)
            // 로그인 실패
            alert('다시 로그인을 시도해보세요');
            navigate('/kakao');
            }
          )
        },
        (err: AxiosError<any>): void => {
          alert(err)
          // 로그인 실패
          alert('다시 로그인을 시도해보세요');
          navigate('/kakao');
        }
      ).then().catch();
    }
  }, [code]);

  return (
    <div className="signup-auth">
      
      {/*문구 표시*/}
      <span className="signup-auth__title">
        로딩중
      </span>
      
    </div>
  );
};

export default SignupAuth;
