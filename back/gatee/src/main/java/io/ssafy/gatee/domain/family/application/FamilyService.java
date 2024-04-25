package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCode;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;

import java.util.UUID;

public interface FamilyService {

    void saveFamily(FamilySaveReq familySaveReq);

    FamilyCodeRes createFamilyCode(Long familyId);

    void joinFamily(String familyCode, UUID memberId) throws ExpiredCode;

    FamilyInfoRes readFamily(Long familyId) throws FamilyNotFoundException;

    void editFamilyName(Long familyId, FamilyNameReq familyNameReq) throws FamilyNotFoundException;
}
