package io.ssafy.gatee.domain.family.api;

import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCode;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/family")
@RequiredArgsConstructor
@Slf4j
public class FamilyController {

    private final FamilyService familyService;

    // 가족 생성
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveFamily(@RequestBody FamilySaveReq familySaveReq) {
        familyService.saveFamily(familySaveReq);
    }

    // 가족 코드 생성
    @GetMapping("/{familyId}/code")
    @ResponseStatus(HttpStatus.OK)
    public FamilyCodeRes createFamilyCode(@PathVariable("familyId") String familyId) {
        return familyService.createFamilyCode(Long.valueOf(familyId));
    }

    // 가족 합류
    @PostMapping("/join")
    @ResponseStatus(HttpStatus.OK)
    public void joinFamily(
            @Valid
            @RequestParam String familyCode,
            @RequestParam String memberId
    ) throws ExpiredCode {
        familyService.joinFamily(familyCode, UUID.fromString(memberId));
    }

    // 가족 정보 조회
    @GetMapping("/{familyId}")
    @ResponseStatus(HttpStatus.OK)
    public FamilyInfoRes readFamily(@PathVariable("familyId") String familyId) throws FamilyNotFoundException {
        log.info(familyId);
        return familyService.readFamily(Long.valueOf(familyId));
    }

    // 가족 이름 수정
    @PatchMapping("/{familyId}")
    @ResponseStatus(HttpStatus.OK)
    public void editFamilyName(
            @PathVariable("familyId") String familyId,
            @RequestBody FamilyNameReq familyNameReq
            ) throws FamilyNotFoundException {
        log.info(familyId);
        familyService.editFamilyName(Long.valueOf(familyId), familyNameReq);
    }
}
