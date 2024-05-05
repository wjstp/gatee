package io.ssafy.gatee.global.exception.error.forbidden;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class BadRefreshTokenException extends Exception{

    public BadRefreshTokenException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
