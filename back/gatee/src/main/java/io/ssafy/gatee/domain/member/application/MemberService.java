package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;

import java.text.ParseException;
import java.util.UUID;

public interface MemberService {

    void register(String name, String nickname);

    void saveMemberInfo(MemberSaveReq memberSaveReq) throws ParseException;

    void editMemberInfo(MemberEditReq memberEditReq) throws ParseException;

    void editProfileImage(String imageUrl);

    void editMood(MemberEditMoodReq memberEditMoodReq);

    MemberInfoRes readMemberInfo(Long familyId, UUID memberId);
}
