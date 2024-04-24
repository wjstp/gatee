package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;

public interface FamilyService {

    void saveFamily(FamilySaveReq familySaveReq);

    FamilyInfoRes readFamily(Long familyId) throws FamilyNotFoundException;

    void editFamilyName(Long familyId, FamilyNameReq familyNameReq) throws FamilyNotFoundException;
}
