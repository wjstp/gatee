package io.ssafy.gatee.global.exception.error.forbidden;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class MalFormedTokenException extends Exception {
    
    public MalFormedTokenException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
