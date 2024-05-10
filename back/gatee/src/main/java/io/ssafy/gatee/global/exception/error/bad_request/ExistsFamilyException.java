package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class ExistsFamilyException extends RuntimeException {
    public ExistsFamilyException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }

}
