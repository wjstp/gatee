import { FamilyMemberInfoSample } from "@constants/index";
import { Member } from "@type/index";

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