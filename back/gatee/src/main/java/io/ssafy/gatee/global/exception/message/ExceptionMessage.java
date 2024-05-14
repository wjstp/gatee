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

    DO_NOT_HAVE_REQUEST("권한이 없습니다."),
    EXPIRED_CODE("만료된 인증코드입니다."),
    WRONG_TYPE_FILTER("잘못된 필터입니다."),
    EXISTS_FAMILY("이미 가족이 존재합니다"),

    UN_ACCEPT("토큰이 null이거나 길이가 짧습니다."),
    BAD_TYPE("토큰이 Bearer 타입이 아닙니다."),

    MALFORMED_TOKEN("Malformed Token"),
    BAD_SIGNATURED_TOKEN( "Bad Signatured Token"),
    EXPIRED_TOKEN("토큰이 만료되었습니다."),
    NO_REFRESH_TOKEN("리프레시 토큰이 존재하지 않습니다."),
    BAD_REFRESH_TOKEN("리프레시 토큰이 일치하지 않습니다.")
    ;

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }
}
