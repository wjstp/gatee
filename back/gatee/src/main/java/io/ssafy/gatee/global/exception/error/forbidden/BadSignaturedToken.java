package io.ssafy.gatee.global.exception.error.forbidden;

import io.ssafy.gatee.global.exception.message.ExceptionMessage;

public class BadSignaturedToken extends Exception{

    public BadSignaturedToken(ExceptionMessage exceptionMessage) {super(exceptionMessage.getMessage());}
}
