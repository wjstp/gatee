import {create} from "zustand";
import {MyMemberApiReq} from "@type/index";



type MemberStore = {
  memberId: string | null;
  setMemberId: (newMemberId: string) => void;
  name: string;
  setName: (newName: string) => void;
  nickname: string | null;
  setNickName: (newNickname: string) => void;
  birthDay: string | null;
  setBirthDay: (newBirthDay: string) => void;
  birthType: string;
  setBirthType: (newBirthType: string) => void;
  role: string;
  setRole: (newRole: string) => void;
  mood: string;
  setMood: (newMood: string) => void;
  phoneNumber: string;
  setPhoneNumber: (newPhoneNumber: string) => void;
  gender: string;
  setGender: (newGender: string) => void;
  icon: string;
  setIcon: (newIcon: string) => void;
  memberImage: string | ArrayBuffer | null;
  setMemberImage: (newImage: string | ArrayBuffer | null) => void;
  myInfo : MyMemberApiReq;
  setMyInfo: (newMyInfo: Partial<MyMemberApiReq>) => void;
};

export const useMemberStore = create<MemberStore>()(
  (set) => ({
    memberId: null,
    setMemberId: (newMemberId: string) => set({memberId: newMemberId}),
    name: "예빈",
    setName: (newName: string) => set({name: newName}),
    nickname: null,
    setNickName: (newNickname: string) => set({nickname: newNickname}),
    birthDay: null,
    setBirthDay: (newBirthDay: string) => set({birthDay: newBirthDay}),
    birthType: "SOLAR",
    setBirthType: (newBirthType: string) => set({birthType: newBirthType}),
    role: "",
    setRole: (newRole: string) => set({role: newRole}),
    mood: "default",
    setMood: (newMood: string) => set({mood: newMood}),
    phoneNumber: "",
    setPhoneNumber: (newPhoneNumber: string) => set({phoneNumber: newPhoneNumber}),
    gender: "",
    setGender: (newGender: string) => set({gender: newGender}),
    icon: "",
    setIcon: (newIcon: string) => set({icon: newIcon}),
    memberImage: null,
    setMemberImage: (newImage: string | ArrayBuffer | null) => set({memberImage: newImage}),

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
      fileUrl:""
    },
    // 정보 수정 방법 : setMyInfo 함수를 호출할 때 변경하려는 속성을 포함하는 객체를 전달
    // ex) 이름과 닉네임을 변경하려면 다음과 같이 호출
    // setMyInfo({ name: '새로운 이름', nickname: '새로운 닉네임' });
    setMyInfo: (newMyInfo: Partial<MyMemberApiReq>) => {
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
