package io.ssafy.gatee.domain.push_notification.application;

import com.google.firebase.messaging.*;
import io.ssafy.gatee.domain.chatgpt.dto.request.QuestionDto;
import io.ssafy.gatee.domain.chatgpt.dto.response.GptResponseDto;
import io.ssafy.gatee.domain.chatgpt.service.GptService;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.global.firebase.FirebaseInit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PushNotificationServiceImpl implements PushNotificationService {

    private final FirebaseInit firebaseInit;
    private final GptService gptService;

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
        log.info("successfully sent message ? " + response);
    }

    @Override
    public void sendNagging(NaggingReq naggingReq) {
        String content = "\"" + naggingReq.message() + "\"라는 문장을 상냥한 어투로 바꿔줘. 이모티콘도 붙여줘.";
        GptResponseDto result = gptService.askQuestion(QuestionDto.builder().content(content).build());
        System.out.println(result);

    }
}
