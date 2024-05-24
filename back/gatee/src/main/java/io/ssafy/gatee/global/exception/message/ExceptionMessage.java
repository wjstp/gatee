package io.ssafy.gatee.global.exception.message;

import lombok.Getter;

@Getter
public enum ExceptionMessage {

    FIlE_NOT_FOUND("파일을 찾을 수 없습니다."),
    MEMBER_NOT_FOUND("회원을 찾을 수 없습니다."),
    MEMBER_FAMILY_NOT_FOUND("회원의 가족 정보를 찾을 수 없습니다."),
    FAMILY_NOT_FOUND("가족을 찾을 수 없습니다."),
    SCHEDULE_NOT_FOUND("일정을 찾을 수 없습니다."),
    FAMILY_SCHEDULE_NOT_FOUND("가족 내의 해당 일정을 찾을 수 없습니다."),
    MEMBER_FAMILY_SCHEDULE_NOT_FOUND("가족 내의 해당 일정에서 회원 정보를 찾을 수 없습니다."),
    ALBUM_NOT_FOUND("가족 내의 앨범을 찾을 수 없습니다."),
    MEMBER_FEATURE_NOT_FOUND("백문백답 정보를 찾을 수 없습니다."),
    MEMBER_NOTIFICATION_NOT_FOUND("푸시 알림 동의 항목을 찾을 수 없습니다."),
    APPOINTMENT_NOT_FOUNT("해당 약속을 찾을 수 없습니다."),
    PUSH_NOTIFICATION_NOT_FOUND("해당 알림을 찾을 수 없습니다."),

    DO_NOT_HAVE_REQUEST("권한이 없습니다."),
    EXPIRED_CODE("만료된 인증코드입니다."),
    WRONG_TYPE_FILTER("잘못된 필터입니다."),
    EXISTS_FAMILY("이미 가족이 존재합니다"),
    EXISTS_MEMBER_FAMILY_SCHEDULE("이미 일정에 참여되어 있습니다."),
    DID_NOT_COMPLETED("완료되지 않았습니다."),

    UN_ACCEPT("토큰이 null이거나 길이가 짧습니다."),
    BAD_TYPE("토큰이 Bearer 타입이 아닙니다."),

    GPT_SERVICE_UNAVAILABLE("Open AI 서버 요청 부하");

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }
}
