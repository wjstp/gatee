package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class WrongTypeFilterException extends RuntimeException {

    public WrongTypeFilterException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
