package io.ssafy.gatee.global.exception.error.forbidden;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class ExpiredTokenException extends Exception{

    public ExpiredTokenException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
