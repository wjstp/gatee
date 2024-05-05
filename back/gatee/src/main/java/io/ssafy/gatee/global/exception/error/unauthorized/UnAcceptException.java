package io.ssafy.gatee.global.exception.error.unauthorized;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class UnAcceptException extends Exception{
    public UnAcceptException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
