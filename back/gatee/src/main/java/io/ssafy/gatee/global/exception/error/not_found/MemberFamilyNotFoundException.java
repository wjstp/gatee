package io.ssafy.gatee.global.exception.error.not_found;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class MemberFamilyNotFoundException extends RuntimeException {

    public MemberFamilyNotFoundException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
