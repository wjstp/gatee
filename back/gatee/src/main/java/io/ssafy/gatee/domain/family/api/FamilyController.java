package io.ssafy.gatee.domain.family.api;

import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dto.request.FamilyJoinReq;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCheckRes;
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
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/family")
@RequiredArgsConstructor
public class FamilyController {

    private final FamilyService familyService;
    private final FileService fileService;

    // 가족 생성
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public FamilySaveRes saveFamily(
            @RequestParam("name") String name,
            @RequestParam("fileType") @Nullable FileType fileType,
            @RequestParam("file") @Nullable MultipartFile file,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws IOException {
        return familyService.saveFamily(
                name,
                customUserDetails.getMemberId(),
                fileType,
                file
        );
    }

    // 가족 코드 생성
    @GetMapping("/code")
    @ResponseStatus(HttpStatus.OK)
    public FamilyCodeRes createFamilyCode(
            @RequestParam String familyId
    ) {
        return familyService.createFamilyCode(familyId);
    }

    // 가족 코드 확인
    @GetMapping("/check")
    @ResponseStatus(HttpStatus.OK)
    public FamilyCheckRes checkFamilyCode(
            @RequestParam String familyCode,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return familyService.checkFamilyCode(familyCode, customUserDetails.getMemberId());
    }

    // 가족 합류
    @PostMapping("/join")
    @ResponseStatus(HttpStatus.OK)
    public void joinFamily(
            @Valid
            @RequestBody FamilyJoinReq familyJoinReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws ExpiredCodeException {
        familyService.joinFamily(familyJoinReq, customUserDetails.getMemberId());
    }

    // 가족 정보 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public FamilyInfoRes readFamily(
            @RequestParam String familyId
    ) throws FamilyNotFoundException {
        return familyService.readFamily(familyId);
    }

    // 가족 이름 수정
    @PatchMapping("/{familyId}")
    @ResponseStatus(HttpStatus.OK)
    public void editFamilyName(
            @Valid
            @PathVariable("familyId") String familyId,
            @RequestBody FamilyNameReq familyNameReq
    ) throws FamilyNotFoundException {
        log.info(familyId);
        familyService.editFamilyName(UUID.fromString(familyId), familyNameReq);
    }

    // 가족 사진 변경
    @PostMapping("/image")
    @ResponseStatus(HttpStatus.OK)
    public void editProfileImage(
            @Valid
            @RequestParam FileType fileType,
            @RequestParam @Nullable MultipartFile file,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws IOException {
        familyService.editFamilyImage(fileType, file, customUserDetails.getMemberId());
    }
}
