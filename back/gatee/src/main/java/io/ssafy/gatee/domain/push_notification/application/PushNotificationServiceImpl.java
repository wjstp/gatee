package io.ssafy.gatee.domain.push_notification.application;

import com.google.firebase.messaging.*;
import io.ssafy.gatee.domain.chatgpt.dto.request.QuestionDto;
import io.ssafy.gatee.domain.chatgpt.dto.response.GptResponseDto;
import io.ssafy.gatee.domain.chatgpt.service.GptService;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_notification.dao.MemberNotificationRepository;
import io.ssafy.gatee.domain.member_notification.entity.MemberNotification;
import io.ssafy.gatee.domain.push_notification.dao.CustomPushNotificationRepositoryImpl;
import io.ssafy.gatee.domain.push_notification.dao.PushNotificationRepository;
import io.ssafy.gatee.domain.push_notification.dto.request.DataFCMReq;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.domain.push_notification.dto.request.NotificationAgreementReq;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationFCMReq;
import io.ssafy.gatee.domain.push_notification.dto.response.NaggingRes;
import io.ssafy.gatee.domain.push_notification.dto.response.NotificationAgreementRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationPageRes;
import io.ssafy.gatee.domain.push_notification.entity.PushNotification;
import io.ssafy.gatee.domain.push_notification.entity.PushNotifications;
import io.ssafy.gatee.domain.push_notification.entity.Type;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotificationNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.PushNotificationNotFoundException;
import io.ssafy.gatee.global.firebase.FirebaseInit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.google.firebase.messaging.MessagingErrorCode.UNREGISTERED;
import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class PushNotificationServiceImpl implements PushNotificationService {

    private final FirebaseInit firebaseInit;
    private final GptService gptService;
    private final MemberRepository memberRepository;
    private final MemberNotificationRepository memberNotificationRepository;
    private final PushNotificationRepository pushNotificationRepository;
    private final CustomPushNotificationRepositoryImpl customPushNotificationRepository;

    private final String DEFAULT_NOTIFICATION_IMAGE = "https://spring-learning.s3.ap-southeast-2.amazonaws.com/default/family.jpg";

    @Override
    public PushNotificationPageRes readNotifications(UUID memberId, Pageable pageable, String cursor) {
        return customPushNotificationRepository.findMyPushNotifications(memberId.toString(), PageRequest.of(pageable.getPageNumber(), pageable.getPageSize() + 1), cursor);
    }

    @Override
    public void checkReadNotification(String notificationId) {
        PushNotifications pushNotifications = pushNotificationRepository.findById(notificationId)
                .orElseThrow(() -> new PushNotificationNotFoundException(PUSH_NOTIFICATION_NOT_FOUND));
        pushNotifications.checkPushNotifications();
        pushNotificationRepository.save(pushNotifications);
    }

    @Override
    public NotificationAgreementRes readNotificationAgreements(UUID memberId) {
        Member member = memberRepository.getReferenceById(memberId);
        MemberNotification memberNotification = memberNotificationRepository.findByMember(member)
                .orElseThrow(() -> new MemberNotificationNotFoundException(MEMBER_NOTIFICATION_NOT_FOUND));
        return NotificationAgreementRes.toDto(memberNotification);
    }

    @Override
    @Transactional
    public void modifyNotificationAgreements(UUID memberId, NotificationAgreementReq agreementReq) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        MemberNotification memberNotification = memberNotificationRepository.findByMember(proxyMember)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOTIFICATION_NOT_FOUND));
        memberNotification.modifyMemberNotification(agreementReq);
    }

    @Override
    public String findTokenByMemberId(UUID memberId) {
        return memberRepository.findById(memberId).orElseThrow(()
                -> new MemberNotFoundException(MEMBER_NOT_FOUND)).getNotificationToken();
    }

    @Override
    public boolean checkAgreement(Type type, UUID memberId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        MemberNotification memberNotification = memberNotificationRepository.findByMember(proxyMember).orElse(null);
        return switch (type) {
            case NAGGING -> Objects.nonNull(memberNotification) && memberNotification.isNaggingNotification();
            case SCHEDULE -> Objects.nonNull(memberNotification) && memberNotification.isScheduleNotification();
            case ALBUM -> Objects.nonNull(memberNotification) && memberNotification.isAlbumNotification();
            case CHATTING -> Objects.nonNull(memberNotification) && memberNotification.isChatNotification();
            case FEATURE -> Objects.nonNull(memberNotification) && memberNotification.isFeatureNotification();
            default -> false;
        };
    }

    @Override
    public void savePushNotification(PushNotificationFCMReq pushNotificationFCMReq) {
        String senderImageUrl;
        if (Objects.nonNull(pushNotificationFCMReq.senderId())) {
            senderImageUrl = memberRepository.findById(UUID.fromString(pushNotificationFCMReq.senderId()))
                    .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND)).getFile().getUrl();
        } else {
            senderImageUrl = DEFAULT_NOTIFICATION_IMAGE;
        }
        if (pushNotificationFCMReq.dataFCMReq().type().equals(Type.CHATTING)) {
            return;
        }
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        ZonedDateTime nowInKoreanTime = LocalDateTime.now().atZone(ZoneId.systemDefault())
                .withZoneSameInstant(ZoneId.of("Asia/Seoul"));
        LocalDateTime localDateTimeInKoreanTime = nowInKoreanTime.toLocalDateTime();
        String now = dateTimeFormatter.format(localDateTimeInKoreanTime);
        List<PushNotifications> pushNotifications = pushNotificationFCMReq.receiverId().stream()
                .map(receiverId -> PushNotifications.builder()
                        .type(pushNotificationFCMReq.dataFCMReq().type().toString())
                        .typeId(pushNotificationFCMReq.dataFCMReq().typeId())
                        .senderId(pushNotificationFCMReq.senderId())
                        .senderImageUrl(senderImageUrl)
                        .receiverId(receiverId.toString())
                        .title(pushNotificationFCMReq.title())
                        .content(pushNotificationFCMReq.content())
                        .createdAt(now)
                        .isCheck(false).build()).toList();
        log.info("저장");
        pushNotificationRepository.saveAll(pushNotifications);
    }

    @Override
    public NaggingRes sendNagging(NaggingReq naggingReq, UUID memberId) throws FirebaseMessagingException {
        String content = "\"" + naggingReq.message() + "\"라는 문장을 상냥한 어투로 바꿔줘. 이모티콘도 붙여줘.";
        GptResponseDto result = gptService.askQuestion(QuestionDto.builder().content(content).build());
        log.info(result.answer());
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        PushNotificationFCMReq pushNotification = PushNotificationFCMReq.builder()
                .receiverId(Collections.singletonList(naggingReq.receiverId()))
                .senderId(String.valueOf(memberId))
                .title(member.getNickname() + "님의 " + Type.NAGGING.korean)
                .content(result.answer())
                .dataFCMReq(DataFCMReq.builder()
                        .type(Type.NAGGING)
                        .typeId(0L)
                        .build())
                .build();
        sendPushOneToOne(pushNotification);
        PushNotificationFCMReq myPushNotification = PushNotificationFCMReq.builder()
                .receiverId(Collections.singletonList(memberId))
                .senderId(String.valueOf(memberId))
                .title("나의 " + Type.NAGGING.korean + "가 전송되었습니다.")
                .content(result.answer())
                .dataFCMReq(DataFCMReq.builder()
                        .type(Type.NAGGING)
                        .typeId(0L)
                        .build())
                .build();
        sendPushOneToOne(myPushNotification);

        return NaggingRes.builder().naggingMessage(result.answer()).build();
    }

    @Override
    public void sendPushOneToOne(PushNotificationFCMReq pushNotificationFCMReq) throws FirebaseMessagingException {
        // receiver의 권한 여부 확인 - 권한이 없으면 token도 없다
        String receiverToken = findTokenByMemberId(pushNotificationFCMReq.receiverId().get(0));
        // type별 권한 확인
        boolean isAgreed = checkAgreement(pushNotificationFCMReq.dataFCMReq().type(), pushNotificationFCMReq.receiverId().get(0));
        // fcm 요청
        if (Objects.nonNull(receiverToken) && isAgreed) {
            firebaseInit.init();
            Message message = Message.builder()
                    .putData(pushNotificationFCMReq.dataFCMReq().type().toString(),
                            pushNotificationFCMReq.dataFCMReq().typeId().toString())
                    .setToken(receiverToken)
                    .setNotification(Notification.builder()
                            .setTitle(pushNotificationFCMReq.title())
//                            .setImage("https://source.unsplash.com/random/cat")
                            .setBody(pushNotificationFCMReq.content())
                            .build())  // 내용 설정
                    // 안드로이드 설정
                    .setAndroidConfig(AndroidConfig.builder()
                            .setTtl(3600 * 1000)    // 푸시 알림 유지 시간
                            .setNotification(AndroidNotification.builder()
                                    .setTitle(pushNotificationFCMReq.title())
                                    .setImage("https://source.unsplash.com/random/cat")
                                    .setBody(pushNotificationFCMReq.content())
                                    .setClickAction("push_click").build())  // 푸시 알림 클릭시 연결 동작
                            .build())
                    // ios 설정
                    .setApnsConfig(ApnsConfig.builder()
                            .setAps(Aps.builder()
                                    .setCategory("https://source.unsplash.com/random/apple")
                                    .setBadge(42)
                                    .build())
                            .build())
                    .build();
            String response = FirebaseMessaging.getInstance().send(message);
            log.info("successfully sent message ? " + response);
        }
        savePushNotification(pushNotificationFCMReq);

    }

    @Override
    @Transactional
    public void sendPushOneToMany(PushNotificationFCMReq pushNotificationFCMReq) throws FirebaseMessagingException {   // 이건 토큰 할때나..
        log.info(pushNotificationFCMReq.receiverId().toString());
        List<String> receiverTokens = pushNotificationFCMReq.receiverId().stream()
                .map(memberRepository::findById)
                .filter(Optional::isPresent)
                .filter(receiverGet -> Objects.nonNull(receiverGet.get().getNotificationToken()) && !receiverGet.equals(""))
                .filter(receiver -> checkAgreement(pushNotificationFCMReq.dataFCMReq().type(), receiver.get().getId()))
                .map(receiver -> receiver.get().getNotificationToken()).toList();
//        log.info(checkAgreement(pushNotificationFCMReq.dataFCMReq().type(), pushNotificationFCMReq.receiverId().get(0))+"");
        log.info(receiverTokens.toString());
        if (!receiverTokens.isEmpty()) {
            MulticastMessage message = MulticastMessage.builder()
                    .addAllTokens(receiverTokens)
                    //                .putData()  // 보여줄 정보 외 데이터 설정
                    .setNotification(Notification.builder()
                            .setTitle(pushNotificationFCMReq.title())
                            //                        .setImage("보내는 사람 프로필 이미지")
                            .setBody(pushNotificationFCMReq.content())
                            .build())  // 내용 설정
                    // 안드로이드 설정
                    .setAndroidConfig(AndroidConfig.builder()
                            .setTtl(3600 * 1000)    // 푸시 알림 유지 시간
                            .setNotification(AndroidNotification.builder()
                                    .setTitle(pushNotificationFCMReq.title())
                                    //                                .setImage("보내는 사람 프로필 이미지")
                                    .setBody(pushNotificationFCMReq.content())
                                    .setClickAction("push_click").build())  //푸시 알림 클릭시 연결 동작
                            .build())
                    // ios 설정
                    .setApnsConfig(ApnsConfig.builder()
                            .setAps(Aps.builder()
                                    .setCategory("push_click")
                                    .setBadge(42)
                                    .build())
                            .build())
                    .build();
            BatchResponse response = FirebaseMessaging.getInstance().sendEachForMulticast(message);    // sendmulticast
            if (response.getFailureCount() > 0) {
                List<SendResponse> responses = response.getResponses();
                List<String> failedTokens = new ArrayList<>();
                for (int i = 0; i < responses.size(); i++) {
                    if (!responses.get(i).isSuccessful()) {
                        // 응답 코드 확인 후 토큰 에러 일시, 토큰 삭제
                        MessagingErrorCode exception = responses.get(i).getException().getMessagingErrorCode();
                        if (exception.equals(UNREGISTERED)) {
                            Optional<Member> member = memberRepository.findByNotificationToken(receiverTokens.get(i));
                            member.ifPresent(mem -> mem.saveNotificationToken(null));
                        }
                        failedTokens.add(receiverTokens.get(i));
                    }
                }
            }
            // 저장 로직 success와 fail모두 - 이때는 receiveridlist 활용
            List<PushNotification> notificationList = new ArrayList<>();
            //        pushNotificationRepository.saveAll(notificationList);
            log.info(response.getFailureCount() + " messages were not sent");
            log.info(response.getSuccessCount() + " messages were sent successfully");
        }
        savePushNotification(pushNotificationFCMReq);
    }

    @Override
    public void sendTestPush(String token) throws FirebaseMessagingException {
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
                                .setClickAction("push_click").build())  // 푸시 알림 클릭시 연결 동작
                        .build())
                // ios 설정
                .setApnsConfig(ApnsConfig.builder()
                        .setAps(Aps.builder()
                                .setCategory("https://source.unsplash.com/random/apple")
                                .setBadge(42)
                                .build())
                        .build())
                .build();
        String response = FirebaseMessaging.getInstance().send(message);
        log.info("successfully sent message ? " + response);
    }
}
