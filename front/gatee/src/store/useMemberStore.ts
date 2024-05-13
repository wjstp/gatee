import {create} from "zustand";
import { MemberApiReq, MemberStore } from "@type/index";

export const useMemberStore = create<MemberStore>()(
  (set) => ({
    memberId: null,
    setMemberId: (newMemberId: string) => set({memberId: newMemberId}),
    name: "",
    setName: (newName: string) => set({name: newName}),
    nickname: null,
    setNickName: (newNickname: string) => set({nickname: newNickname}),
    birth: null,
    setBirth: (newBirth: string) => set({birth: newBirth}),
    birthType: "SOLAR",
    setBirthType: (newBirthType: string) => set({birthType: newBirthType}),
    role: null,
    setRole: (newRole: string | null) => set({role: newRole}),
    mood: "default",
    setMood: (newMood: string) => set({mood: newMood}),
    phoneNumber: "",
    setPhoneNumber: (newPhoneNumber: string) => set({phoneNumber: newPhoneNumber}),
    gender: "",
    setGender: (newGender: string) => set({gender: newGender}),
    memberImage: null,
    setMemberImage: (newImage: File | null) => set({memberImage: newImage}),
    stringMemberImage: "",
    setStringMemberImage: (newStringMemberImage: string) => set({stringMemberImage: newStringMemberImage}),

    // 내 정보 객체
    myInfo : {
      birth: "2000-07-20",
      birthType: "SOLAR",
      email: "******@gmail.com",
      memberId: "123123",
      mood: "default",
      name: "이윤정",
      nickname: "쌒유진",
      role: "딸",
      phoneNumber: null,
      familyId:"ㅁㄴㅇ",
      fileUrl:"",
      isLeader:true,
      memberImage: null,
      stringMemberImage: "",
    },
    // 정보 수정 방법 : setMyInfo 함수를 호출할 때 변경하려는 속성을 포함하는 객체를 전달
    // ex) 이름과 닉네임을 변경하려면 다음과 같이 호출
    // setMyInfo({ name: '새로운 이름', nickname: '새로운 닉네임' });
    setMyInfo: (newMyInfo: Partial<MemberApiReq>) => {
      set((state) => ({
        ...state,
        myInfo: {
          ...state.myInfo,
          ...newMyInfo,
        },
      }));
    },
  })
);
