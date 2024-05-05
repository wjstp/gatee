package io.ssafy.gatee.global.exception.error.unauthorized;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class BadTypeException extends RuntimeException{

    public BadTypeException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
