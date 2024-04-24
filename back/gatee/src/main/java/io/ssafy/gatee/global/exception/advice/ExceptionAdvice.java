package io.ssafy.gatee.global.exception.advice;

import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({
            MemberNotFoundException.class,
            MemberFamilyNotFoundException.class,
            FamilyNotFoundException.class
    })
    public String handleNotFound(RuntimeException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler
    public String handleBadRequest(RuntimeException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.CONFLICT)
//    @ExceptionHandler
    public String handleDuplicateException(RuntimeException e) {
        return e.getMessage();
    }
}
