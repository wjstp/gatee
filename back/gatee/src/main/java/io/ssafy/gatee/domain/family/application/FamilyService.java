package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.dto.response.FamilySaveRes;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCodeException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;

import java.util.UUID;

public interface FamilyService {

    FamilySaveRes saveFamily(FamilySaveReq familySaveReq, UUID memberId);

    FamilyCodeRes createFamilyCode(Long familyId);

    UUID getFamilyIdByMemberId(UUID memberId);

    void joinFamily(String familyCode, UUID memberId) throws ExpiredCodeException;

    FamilyInfoRes readFamily(Long familyId) throws FamilyNotFoundException;

    void editFamilyName(Long familyId, FamilyNameReq familyNameReq) throws FamilyNotFoundException;
}
