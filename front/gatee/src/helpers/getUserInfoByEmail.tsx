import { FamilyMemberInfoSample } from "../constants";
import { Member } from "../types";

const getUserInfoByEmail = (email: string) => {
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

export default getUserInfoByEmail;