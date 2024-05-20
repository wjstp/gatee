import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { kakaoLoginAPI, kakaoTokenAPI } from "@api/kakao";
import { useMemberStore } from "@store/useMemberStore";
import Loading from "@components/Loading";
import base64 from "base-64";

const SignupAuth = () => {
  const navigate = useNavigate();
  const kakaoJavaScriptKey: string | undefined = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
  const redirectUri: string | undefined = `${process.env.REACT_APP_API_URL}/auth`

  // 인가 코드 가져오기
  const code: string | null = new URL(window.location.href).searchParams.get('code');
  const accessToken: string | null = localStorage.getItem("accessToken");

  const { setName } = useMemberStore();

  // 인가코드로 redirect 여부 판별
  useEffect(() => {
    if (code) {
      tokenIssuer(code);
    } else {
      if (accessToken) {
        const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
        const decode = base64.decode(payload);
        const json = JSON.parse(decode);

        if (json.authorities[0] === "ROLE_ROLE_USER") {
          navigate(`/main`);
        } else {
          navigate(`/signup`);
        }
      }
    }
  }, [code]);

  // 카카오 로그인으로 카카오 토큰 발급
  const tokenIssuer = (code: string): void => {
    // 카카오 로그인
    kakaoLoginAPI(
      {
        grant_type: "authorization_code",
        client_id: kakaoJavaScriptKey,
        redirect_uri: redirectUri,
        code: code
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      },
      (res: AxiosResponse<any>): void => {
        console.log(res.data.access_token);
        // 카카오 토큰으로 우리 서버 토큰 발급하기
        tokenChange(res.data.access_token);
      },
      (err: AxiosError<any>): void => {
        // 로그인 실패
        console.error("Kakao login failed", err);
        alert('카카오 서버로 로그인이 안돼요!');
        navigate('/kakao');
      }
    ).then().catch();
  }

  // 카카오 토큰으로 우리 서버 토큰 발급
  const tokenChange = (kakaoToken: string): void => {
    kakaoTokenAPI(
      {
        headers: {
          "Kakao-Access-Token": kakaoToken
        }
      },
      (res: AxiosResponse<any>): void => {

        // 우리 토큰 로컬 스토리지 저장
        const accessToken = res.headers.authorization.split(' ')[1];
        localStorage.setItem("accessToken", accessToken);

        // 이름에 카카오 닉네임 저장
        const name = res.data.name;
        setName(name);
        console.log(name);
        console.log(res.data.redirectUrl);

        // 멤버의 상태에 따라 적절한 위치로 보내기
        navigate(res.data.redirectUrl);
      },
      (err: AxiosError<any>): void => {
        console.error(err);
        alert("로그인에 실패했습니다.\n다시 시도해 주세요.");
        navigate('/kakao');
      }
    ).then().catch();
  }

  return (
    <div className="signup-auth">
      <Loading />
    </div>
  );
};

export default SignupAuth;
