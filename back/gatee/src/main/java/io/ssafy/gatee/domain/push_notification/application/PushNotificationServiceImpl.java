package io.ssafy.gatee.domain.push_notification.application;

import com.google.firebase.messaging.*;
import io.ssafy.gatee.domain.push_notification.dao.PushNotificationRepository;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationRes;
import io.ssafy.gatee.domain.push_notification.entity.PushNotification;
import io.ssafy.gatee.domain.push_notification.entity.Type;
import io.ssafy.gatee.global.firebase.FirebaseInit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PushNotificationServiceImpl implements PushNotificationService {

    private final FirebaseInit firebaseInit;
    private final PushNotificationRepository pushNotificationRepository;

    @Override
    public List<PushNotificationRes> readNotifications(UUID memberId) {
        return null;
    }

    @Override
    public void sendTestPush(String token) throws FirebaseMessagingException {
        firebaseInit.init();
        Message message = Message.builder()
                .putData("push", "success")
                .setToken(token)
                .setNotification(Notification.builder()
                        .setTitle("제목")
                        .setImage("https://source.unsplash.com/random/cat")
                        .setBody("내용")
                        .build())  // 내용 설정
                // 안드로이드 설정
                .setAndroidConfig(AndroidConfig.builder()
                        .setTtl(3600 * 1000)    // 푸시 알림 유지 시간
                        .setNotification(AndroidNotification.builder()
                                .setTitle("제목")
                                .setImage("https://source.unsplash.com/random/cat")
                                .setBody("내용")
                                .setClickAction("push_click").build())  // todo: 푸시 알림 클릭시 연결 동작 - 아마도 프론트 함수 호출?
                        .build())
                // ios 설정
                .setApnsConfig(ApnsConfig.builder()
                        .setAps(Aps.builder()
                                .setCategory("https://source.unsplash.com/random/apple")
                                .setBadge(42)   // todo: ?
                                .build())
                        .build())
                .build();
        String response = FirebaseMessaging.getInstance().send(message);
        System.out.println("successfully sent message ? " + response);
    }

    @Override
    public void sendPushOneToOne(String senderToken, String receiverToken, Type type, Long typeId) throws FirebaseMessagingException {
        firebaseInit.init();
        Message message = Message.builder()
                .setToken(receiverToken)
                .build();
        String response = FirebaseMessaging.getInstance().send(message);
        log.info("successfully sent message ? " + response);
        // todo: 수정
        pushNotificationRepository.save(PushNotification.builder()
                                        .isCheck(false)
                                        .receiverId(List.of(UUID.fromString("testId")))
                                        .type(Type.NAGGING) 
                                        .typeId(1L)
                                        .content("내용").build());
    }

    @Override
    public void sendPushOneToMany(String senderToken, List<String> receiverTokenList, Type type, Long typeId) throws FirebaseMessagingException {   // 이건 토큰 할때나..
        firebaseInit.init();
        MulticastMessage message = MulticastMessage.builder()
                .addAllTokens(receiverTokenList)
//                .putData()  // 보여줄 정보 외 데이터 설정
                .setNotification(Notification.builder()
                        .setTitle("제목")
                        .setImage("보내는 사람 프로필 이미지")
                        .setBody("내용")
                        .build())  // 내용 설정
                // 안드로이드 설정
                .setAndroidConfig(AndroidConfig.builder()
                        .setTtl(3600 * 1000)    // 푸시 알림 유지 시간
                        .setNotification(AndroidNotification.builder()
                                .setTitle("제목")
                                .setImage("보내는 사람 프로필 이미지")
                                .setBody("내용")
                                .setClickAction("push_click").build())  // todo: 푸시 알림 클릭시 연결 동작 - 아마도 프론트 함수 호출?
                        .build())
                // ios 설정
                .setApnsConfig(ApnsConfig.builder()
                        .setAps(Aps.builder()
                                .setCategory("push_click")
                                .setBadge(42)   // todo: ?
                                .build())
                        .build())
                .build();
        BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
        if (response.getFailureCount() > 0) {
            List<SendResponse> responses = response.getResponses();
            List<String> failedTokens = new ArrayList<>();
            for (int i = 0; i < responses.size(); i++) {
                if (!responses.get(i).isSuccessful()) {
                    // todo: 토큰 오류 시 로직 추가 - db에는 저장해야 한다.
                    failedTokens.add(receiverTokenList.get(i));
                }
            }
        }
        // 저장 로직 success와 fail모두
        List<PushNotification> notificationList = new ArrayList<>();
        pushNotificationRepository.saveAll(notificationList);
        log.info(response.getFailureCount() + " messages were not sent");
        log.info(response.getSuccessCount() + " messages were sent successfully");
    }
}
