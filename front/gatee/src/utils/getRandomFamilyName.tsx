import React from 'react';
import {MemberApiReq} from "@type/index";

const getRandomFamilyName = (familyInfo:MemberApiReq[],myName:string) => {
  // familyInfo 배열이 비어있는지 확인
  if (familyInfo.length === 0) {
    return null; // 배열이 비어있으면 null 반환
  }

  const lastFamilyName = familyInfo.filter((item)=>item.nickname !==myName)

  // 랜덤 인덱스 생성
  const randomIndex = Math.floor(Math.random() * lastFamilyName.length);

  // 랜덤 인덱스의 객체에서 nickname 속성 반환
  return lastFamilyName[randomIndex];
};

export default getRandomFamilyName;