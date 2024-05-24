package io.ssafy.gatee.global.exception.error.service_unavailable;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class GptServiceUnavailable extends RuntimeException {

    public GptServiceUnavailable(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
