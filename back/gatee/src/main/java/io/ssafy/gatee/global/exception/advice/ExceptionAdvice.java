package io.ssafy.gatee.global.exception.advice;

import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCodeException;
import io.ssafy.gatee.global.exception.error.bad_request.WrongTypeFilterException;
import io.ssafy.gatee.global.exception.error.forbidden.BadRefreshTokenException;
import io.ssafy.gatee.global.exception.error.forbidden.BadSignaturedToken;
import io.ssafy.gatee.global.exception.error.forbidden.MalFormedTokenException;
import io.ssafy.gatee.global.exception.error.forbidden.NoRefreshTokenException;
import io.ssafy.gatee.global.exception.error.not_found.*;
import io.ssafy.gatee.global.exception.error.unauthorized.BadTypeException;
import io.ssafy.gatee.global.exception.error.unauthorized.UnAcceptException;
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
            FamilyNotFoundException.class,
            ScheduleNotFoundException.class,
            FamilyScheduleNotFoundException.class,
            MemberFamilyScheduleNotFoundException.class,
            AlbumNotFoundException.class
    })
    public String handleNotFound(RuntimeException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            DoNotHavePermissionException.class,
            ExpiredCodeException.class,
            WrongTypeFilterException.class
    })
    public String handleBadRequest(RuntimeException e) {
        return e.getMessage();
    }


    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler({
            BadRefreshTokenException.class,
            BadSignaturedToken.class,
            ExpiredCodeException.class,
            MalFormedTokenException.class,
            NoRefreshTokenException.class
    })
    public String handleForbidden(RuntimeException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({
            BadTypeException.class,
            UnAcceptException.class,
    })
    public String handleUnauthorized(RuntimeException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.CONFLICT)
//    @ExceptionHandler
    public String handleDuplicateException(RuntimeException e) {
        return e.getMessage();
    }
}
