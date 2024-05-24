package io.ssafy.gatee.global.exception.error.not_found;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class MemberFamilyScheduleNotFoundException extends RuntimeException {

    public MemberFamilyScheduleNotFoundException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
