import React, { useEffect } from "react";
import TopBar from '@components/TopBar';
import BottomBar from "@components/BottomBar";
import { Outlet, useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useModalStore } from "@store/useModalStore";
import { useMemberStore } from "@store/useMemberStore";
import { useFamilyStore}  from "@store/useFamilyStore";
import { getFamilyMemberApi, getMyDataApi } from "@api/member";
import { useChatStore } from "@store/useChatStore";

const MainLayout = () => {
  const {showModal} = useModalStore();
  const { setMyInfo } = useMemberStore();
  const {familyInfo,setFamilyId, setFamilyInfo, setFamilyName, setFamilyScore} = useFamilyStore();
  const { showBottomBar } = useChatStore();

  // 가족 데이터 저장 Api
  const saveFamilyData = (familyId:string) => {
    getFamilyMemberApi({familyId:familyId},
      (res) => {
        console.log("가족 정보 조회",res.data);
        setFamilyInfo(res.data.memberFamilyInfoList);
        setFamilyName(res.data.name);
        setFamilyScore(res.data.familyScore);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // 정보 불러오기 Api
  const saveMemberData = () => {
    getMyDataApi(
      (res) => {
        console.log("내 정보 조회",res.data)
        // 스토어에 저장
        setMyInfo(res.data)
        setFamilyId(res.data.familyId)
        // 가족 데이터 저장 Api
        saveFamilyData(res.data.familyId)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  useEffect(() => {
    // 스토어가 비어있을 때만
    if (familyInfo.length === 0)
    saveMemberData();
  }, []);

  return (
    <>
      {/* 모달이 띄워진 상태라면 상단바를 회색으로 만듦 */}
      {
        showModal ?
          (
            <HelmetProvider>
            <Helmet>
              <meta name="theme-color" id="theme-color" content="#808080"/>
            </Helmet>
          </HelmetProvider>
          )
          :
          (
            <HelmetProvider>
            <Helmet>
              <meta name="theme-color" id="theme-color" content="#FEFEFE"/>
            </Helmet>
          </HelmetProvider>
          )
      }

      <TopBar></TopBar>
      <div id={showBottomBar? "main" : "main-focus"}>
        <Outlet />
      </div>
      { showBottomBar && <BottomBar></BottomBar> }
    </>
  )
}

export default MainLayout