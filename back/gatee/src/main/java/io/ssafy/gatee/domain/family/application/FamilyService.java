package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.family.dto.request.FamilyJoinReq;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCheckRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.dto.response.FamilySaveRes;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCodeException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface FamilyService {

    FamilySaveRes saveFamily(String name, UUID memberId, FileType fileType, MultipartFile file) throws IOException;

    FamilyCodeRes createFamilyCode(String familyId);

    UUID getFamilyIdByMemberId(UUID memberId);

    void joinFamily(FamilyJoinReq familyCode, UUID memberId) throws ExpiredCodeException;

    FamilyInfoRes readFamily(String s) throws FamilyNotFoundException;

    void editFamilyName(UUID familyId, FamilyNameReq familyNameReq) throws FamilyNotFoundException;

    FamilyCheckRes checkFamilyCode(String familyCode, UUID memberId);

    List<Family> findAllFamily();

    void editFamilyImage(FileType fileType, MultipartFile file, UUID memberId) throws IOException;
}
