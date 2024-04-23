package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.member.dto.request.MemberInfoReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;

import java.text.ParseException;
import java.util.UUID;

public interface MemberService {

    void register(String name, String nickname);

    void saveMemberInfo(MemberInfoReq memberInfoReq) throws ParseException;

    MemberInfoRes readMemberInfo(Long familyId, UUID memberId);
}
