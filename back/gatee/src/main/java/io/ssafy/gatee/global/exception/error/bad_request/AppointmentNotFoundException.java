package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class AppointmentNotFoundException extends RuntimeException {

    public AppointmentNotFoundException(ExceptionMessage message) {
        super(message.getMessage());
    }
}
