package io.ssafy.gatee.domain.push_notification.api;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.TokenReq;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class PushNotificationController {

    private final PushNotificationService notificationService;

    @PostMapping("/test")
    public String testNotice(@RequestBody TokenReq tokenReq) throws FirebaseMessagingException {
        System.out.println(tokenReq.token());
        notificationService.sendTestPush(tokenReq.token());
        return "notification success";
    }
}
