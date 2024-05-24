package io.ssafy.gatee.global.exception.error.not_found;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class MemberNotificationNotFoundException extends RuntimeException {

    public MemberNotificationNotFoundException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
