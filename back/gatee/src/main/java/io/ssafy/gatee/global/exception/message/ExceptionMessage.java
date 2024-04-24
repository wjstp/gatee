package io.ssafy.gatee.global.exception.message;

import lombok.Getter;

@Getter
public enum ExceptionMessage {

    File_NOT_FOUND("파일을 찾을 수 없습니다."),
    MEMBER_NOT_FOUND("회원을 찾을 수 없습니다."),
    MEMBER_FAMILY_NOT_FOUND("회원의 가족 정보를 찾을 수 없습니다."),
    FAMILY_NOT_FOUND("가족을 찾을 수 없습니다."),
    SCHEDULE_NOT_FOUND("일정을 찾을 수 없습니다."),
    FAMILY_SCHEDULE_NOT_FOUND("가족 내의 해당 일정을 찾을 수 없습니다."),
    MEMBER_FAMILY_SCHEDULE_NOT_FOUND("가족 내의 해당 일정에서 회원 정보를 찾을 수 없습니다."),

    DO_NOT_HAVE_REQUEST("권한이 없습니다.")
    ;

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }
}
