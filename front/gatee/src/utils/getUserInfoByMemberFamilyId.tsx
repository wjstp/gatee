import { MemberApiRes } from "@type/index";

const getUserInfoByMemberFamilyId = (familyInfo: MemberApiRes[], id: string|number) => {
  const userInfo: MemberApiRes | undefined = familyInfo.find(member => Number(member.memberFamilyId) === Number(id));
  if (!userInfo) {
    return null;
  }

  return userInfo;
};

export default getUserInfoByMemberFamilyId;