package io.ssafy.gatee.global.exception.error.not_found;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class FamilyNotFoundException extends RuntimeException {

    public FamilyNotFoundException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
