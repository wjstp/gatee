package io.ssafy.gatee.global.exception.error.bad_request;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class DidNotCompleted extends RuntimeException {

    public DidNotCompleted(ExceptionMessage message) {
        super(message.getMessage());
    }
}
