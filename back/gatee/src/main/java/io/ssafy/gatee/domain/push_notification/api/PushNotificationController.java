package io.ssafy.gatee.domain.push_notification.api;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.domain.push_notification.dto.request.NotificationAgreementReq;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationCheckReq;
import io.ssafy.gatee.domain.push_notification.dto.request.TokenReq;
import io.ssafy.gatee.domain.push_notification.dto.response.NaggingRes;
import io.ssafy.gatee.domain.push_notification.dto.response.NotificationAgreementRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationPageRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class PushNotificationController {

    private final PushNotificationService notificationService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/test")
    public String testNotice(@RequestBody TokenReq tokenReq) throws FirebaseMessagingException {
        log.info(tokenReq.token());
        notificationService.sendTestPush(tokenReq.token());
        return "notification success";
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/nagging")
    public NaggingRes sendNagging(@RequestBody NaggingReq naggingReq, @AuthenticationPrincipal CustomUserDetails customUserDetails) throws FirebaseMessagingException {
        return notificationService.sendNagging(naggingReq, customUserDetails.getMemberId());
    }

    // 알림 목록 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public PushNotificationPageRes readNotifications(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                     @PageableDefault Pageable pageable,
                                                     // default size : 10
                                                     @RequestParam(required = false) String cursor) {
        return notificationService.readNotifications(customUserDetails.getMemberId(), pageable, cursor);
    }

    // 알림 읽음 처리
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/check")
    public void checkReadNotification(@RequestBody PushNotificationCheckReq pushNotificationCheckReq) {
        notificationService.checkReadNotification(pushNotificationCheckReq.notificationId());
    }

    // 동의목록 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/agreements")
    public NotificationAgreementRes readNotificationAgreements(@AuthenticationPrincipal CustomUserDetails customUserDetails) throws FirebaseMessagingException {
        return notificationService.readNotificationAgreements(customUserDetails.getMemberId());
    }

    // 동의목록 변경
    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/agreements")
    public void modifyNotificationAgreements(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody NotificationAgreementReq agreementReq) {
        notificationService.modifyNotificationAgreements(customUserDetails.getMemberId(), agreementReq);
    }
}
