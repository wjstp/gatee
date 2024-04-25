package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class DoNotHavePermission extends Exception {
    public DoNotHavePermission(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
