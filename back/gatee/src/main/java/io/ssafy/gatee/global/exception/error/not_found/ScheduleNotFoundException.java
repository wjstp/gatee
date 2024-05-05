package io.ssafy.gatee.global.exception.error.not_found;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class ScheduleNotFoundException extends Exception {

    public ScheduleNotFoundException(ExceptionMessage exceptionMessage) {
        super(exceptionMessage.getMessage());
    }
}
