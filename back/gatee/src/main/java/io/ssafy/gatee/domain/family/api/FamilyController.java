package io.ssafy.gatee.domain.family.api;

import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dto.request.FamilyIdReq;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.dto.response.FamilySaveRes;
import io.ssafy.gatee.domain.file.application.FileService;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCodeException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api/family")
@RequiredArgsConstructor
@Slf4j
public class FamilyController {

    private final FamilyService familyService;
    private final FileService fileService;

    // 가족 생성
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public FamilySaveRes saveFamily(@RequestBody FamilySaveReq familySaveReq, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return familyService.saveFamily(familySaveReq, UUID.fromString(customUserDetails.getUsername()));
    }

    // 가족 코드 생성
    @GetMapping("/{familyId}/code")
    @ResponseStatus(HttpStatus.OK)
    public FamilyCodeRes createFamilyCode(@RequestBody FamilyIdReq familyIdReq) {
        return familyService.createFamilyCode(familyIdReq.familyId());
    }

    // 가족 합류
    @PostMapping("/join")
    @ResponseStatus(HttpStatus.OK)
    public void joinFamily(
            @Valid
            @RequestParam String familyCode,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws ExpiredCodeException {
        familyService.joinFamily(familyCode, customUserDetails.getMemberId());
    }

    // 가족 정보 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public FamilyInfoRes readFamily(@RequestBody FamilyIdReq familyIdReq) throws FamilyNotFoundException {
        log.info(familyIdReq.familyId());
        return familyService.readFamily(familyIdReq.familyId());
    }

    // 가족 이름 수정
    @PatchMapping("/{familyId}")
    @ResponseStatus(HttpStatus.OK)
    public void editFamilyName(
            @PathVariable("familyId") String familyId,
            @RequestBody FamilyNameReq familyNameReq
    ) throws FamilyNotFoundException {
        log.info(familyId);
        familyService.editFamilyName(UUID.fromString(familyId), familyNameReq);
    }
}
