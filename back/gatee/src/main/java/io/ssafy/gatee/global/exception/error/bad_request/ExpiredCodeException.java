package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class ExpiredCodeException extends RuntimeException {

    public ExpiredCodeException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
