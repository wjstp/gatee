package io.ssafy.gatee.global.exception.message;

import lombok.Getter;

@Getter
public enum ExceptionMessage {

    File_NOT_FOUND("파일을 찾을 수 없습니다.");

    private final String message;

    ExceptionMessage(String message) {
        this.message = message;
    }
}
