import React from 'react';
import axios from "axios";
import {useMemberStore} from "@store/useMemberStore";
import {useNavigate} from "react-router-dom";

const navigate = useNavigate();

export default function localAxios() {
  // 스토어에 저장되어있는 토큰 가져오기
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken
  } = useMemberStore()

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      tmp: "application/json",
    },
  });

  // 요청을 보낼때의 인터셉터
  // axios 요청의 설정값인 config를 가져옴
  instance.interceptors.request.use(
    async (config) => {
      try {
        // 토큰 출력
        console.log(accessToken)
        config.headers["Content-Type"] = "application/json";

        if (accessToken !== null) {
          config.headers.Authorization = `Bearer ${
            JSON.parse(accessToken).accessToken
          }`;
        }
      } catch (error) {
        console.error("Error while setting authorization header:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // 요청에 대한 응답을 인터셉트 한다.
  // 요청에 대한 응답인 response를 가져온다.
  instance.interceptors.response.use(
    // 요청을 보내서 응답이 왔다면 access 토큰에 문제가 없으므로 응답을 return
    async (response) => {
      // console.log(response);
      return response;
    },
    // 만약 요청을 보내서 에러가 왔다면,
    async (error) => {

      // 해당 에러의 코드를 가져온다.
      const status = error.response.data.status;

      // 만약 에러의 이유가 토큰의 유효기간이 만료된 것이라면
      if (
        status == 401 &&
        error.response.data.message === "토큰이 만료되었습니다."
      ) {
        // try catch를 이용한다
        // refresh 토큰도 만료되는 경우 카카오톡 재 로그인
        try {
          // data라는 변수에 요청을 보내 받은 응답값을 저장
          const { data } = await instance.post(
            // url(API주소)
            "/api/members",
            // API에 필요한 데이터 (임시로 넣어둠)
            {
              refreshToken: refreshToken,
            }
          );
          // 토큰 재저장
          await setAccessToken(data.data.accessToken);
          await setRefreshToken(data.data.refreshToken);
          const newAccessToken = data.data.accessToken;
          // 에러났던 요청 설정을 가져오기
          const config = error.config;
          // 에러났던 요청에서 헤더의 accessToken만 갈아끼워서
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          // 재요청을 보냄
          return axios.request(config);

        } catch (refreshError) {
          // 리프레시 토큰 만료시 카카오 로그인 화면으로 보내기
          console.log(refreshError)
          navigate("/kakao");
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
