package io.ssafy.gatee.domain.notification.api;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.notification.application.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping("/test")
    public String testNotice(@RequestBody String token) throws FirebaseMessagingException {
        notificationService.sendPush(token);
        return "notification success";
    }
}
