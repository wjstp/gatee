package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class DoNotHavePermissionException extends Exception {

    public DoNotHavePermissionException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
