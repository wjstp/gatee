import { FamilyMemberInfoSample } from "@constants/index";
import { Member } from "@type/index";

// 태현찡이 해 줄 것
// 1. 함수 이름 getUserInfo로 바꾸기
// 2. UID로 회원의 모든 정보 반환

const getUserInfo = (email: string) => {
  const userInfo: Member | undefined = FamilyMemberInfoSample.find(member => member.email === email);

  if (!userInfo) {
    return {
      image: "",
      nickname: "Unknown",
    };
  }

  return {
    image: userInfo.image,
    nickname: userInfo.nickname,
  };
};

export default getUserInfo;