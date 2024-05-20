package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class DoNotHavePermissionException extends RuntimeException {

    public DoNotHavePermissionException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
