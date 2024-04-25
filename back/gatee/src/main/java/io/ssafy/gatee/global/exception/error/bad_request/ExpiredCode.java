package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class ExpiredCode extends Exception {
    public ExpiredCode(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
