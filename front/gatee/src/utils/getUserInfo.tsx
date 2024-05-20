import { MemberApiRes } from "@type/index";

const getUserInfo = (familyInfo: MemberApiRes[], id: string) => {
  const userInfo: MemberApiRes | undefined = familyInfo.find(member => member.memberId === id);

  if (!userInfo) {
    return null;
  }

  return userInfo;
};

export default getUserInfo;