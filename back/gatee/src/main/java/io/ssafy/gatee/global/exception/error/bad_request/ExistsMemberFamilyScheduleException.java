package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class ExistsMemberFamilyScheduleException extends RuntimeException {
    public ExistsMemberFamilyScheduleException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }

}
