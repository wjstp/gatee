package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.member.dto.request.*;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.member.entity.Member;
import jakarta.servlet.http.HttpServletResponse;

import java.text.ParseException;
import java.util.UUID;

public interface MemberService {

    UUID register(String name, String nickname);

    void saveMemberInfo(MemberSaveReq memberSaveReq, UUID memberId, HttpServletResponse response) throws ParseException;

    void saveNotificationToken(MemberTokenReq memberTokenReq, UUID memberId);

    void editMemberInfo(MemberEditReq memberEditReq, UUID memberId) throws ParseException;

    void editProfileImage(String imageUrl);

    void editMood(MemberEditMoodReq memberEditMoodReq, UUID memberId);

    MemberInfoRes readMemberInfo(UUID memberId);

    void modifyMemberToken(Member member, HttpServletResponse response);
}
