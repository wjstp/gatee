package io.ssafy.gatee.global.exception.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({})
    public String handleNotFound(RuntimeException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler()
    public String handleBadRequest(RuntimeException e) {
        return e.getMessage();
    }

    @ExceptionHandler()
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleDuplicateException(RuntimeException e) {
        return e.getMessage();
    }
}
