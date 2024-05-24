package io.ssafy.gatee.global.jwt.exception;

import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;

public class AccessTokenException extends JwtException {
    private final ACCESS_TOKEN_ERROR error;

    @Getter
    public enum ACCESS_TOKEN_ERROR {
        UN_ACCEPT(401, "토큰이 비어있거나 짧습니다."),
        BAD_TYPE(401, "토큰이 Bearer 타입이 아닙니다."),
        EXPIRED(401, "토큰이 만료되었습니다."),
        MAL_FORM(403, "잘못된 형식의 토큰"),
        BAD_SIGN(403, "Bad Signatured 토큰"),
        ;

        private final int status;
        private final String message;

        ACCESS_TOKEN_ERROR(int status, String message) {
            this.status = status;
            this.message = message;
        }

    }

    public AccessTokenException(ACCESS_TOKEN_ERROR error) {
        super(error.name());
        this.error = error;
    }

    public void addResponseError(HttpServletResponse response) {
        addTokenErrorResponse(response, error.getStatus(), error.getMessage());
    }
}
