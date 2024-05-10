package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.dto.response.FamilySaveRes;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCodeException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;

import java.util.UUID;

public interface FamilyService {

    FamilySaveRes saveFamily(String name, UUID memberId, FileUrlRes fileUrlRes);

    FamilyCodeRes createFamilyCode(String familyId);

    Long findDefaultFamilyImageId(String url);

    UUID getFamilyIdByMemberId(UUID memberId);

    void joinFamily(String familyCode, UUID memberId) throws ExpiredCodeException;

    FamilyInfoRes readFamily(String s) throws FamilyNotFoundException;

    void editFamilyName(UUID familyId, FamilyNameReq familyNameReq) throws FamilyNotFoundException;
}
