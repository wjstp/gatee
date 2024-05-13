package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.request.MemberTokenReq;
import io.ssafy.gatee.domain.member.dto.response.MemberEditProfileImageRes;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.member.entity.Member;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;

public interface MemberService {

    UUID register(String name, String nickname);

    void saveMemberInfo(MemberSaveReq memberSaveReq, UUID memberId, HttpServletResponse response) throws ParseException;

    void saveNotificationToken(MemberTokenReq memberTokenReq, UUID memberId);

    void editMemberInfo(MemberEditReq memberEditReq, UUID memberId) throws ParseException;

    MemberEditProfileImageRes editProfileImage(String defaultImage, FileType fileType, MultipartFile file) throws IOException;

    void editMood(MemberEditMoodReq memberEditMoodReq, UUID memberId);

    MemberInfoRes readMemberInfo(UUID memberId);

    void modifyMemberToken(Member member, HttpServletResponse response);
}
