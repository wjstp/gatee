package io.ssafy.gatee.global.exception.error.forbidden;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class NoRefreshTokenException extends Exception{

    public NoRefreshTokenException(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
