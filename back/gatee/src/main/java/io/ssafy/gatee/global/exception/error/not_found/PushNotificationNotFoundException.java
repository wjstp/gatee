package io.ssafy.gatee.global.exception.error.not_found;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class PushNotificationNotFoundException extends RuntimeException {

    public PushNotificationNotFoundException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
