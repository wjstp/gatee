import { MemberApiReq } from "@type/index";

const getUserInfo = (familyInfo: MemberApiReq[], id: string) => {
  const userInfo: MemberApiReq | undefined = familyInfo.find(member => member.memberId === id);

  if (!userInfo) {
    return null;
  }

  return userInfo;
};

export default getUserInfo;