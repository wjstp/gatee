package io.ssafy.gatee.domain.notification.application;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import io.ssafy.gatee.global.firebase.FirebaseInit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final FirebaseInit firebaseInit;
    @Override
    public void sendPush(String token) throws FirebaseMessagingException {
        firebaseInit.init();
        System.out.println("###" + token);
        Message message = Message.builder()
                .putData("push", "success")
                .putData("time", "1:30")
                .setToken(token)
                .build();
        String response = FirebaseMessaging.getInstance().send(message);
        System.out.println("successfully sent message ? " + response);
    }
}
