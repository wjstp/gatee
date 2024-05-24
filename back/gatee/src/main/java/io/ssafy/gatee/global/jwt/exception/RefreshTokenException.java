package io.ssafy.gatee.global.jwt.exception;

import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;

public class RefreshTokenException extends JwtException {

    private final REFRESH_TOKEN_ERROR error;

    @Getter
    public enum REFRESH_TOKEN_ERROR {
        NO_ACCESS(401, "No access"),
        BAD_ACCESS(401, "Bad access"),
        NO_REFRESH(403, "Refresh Token이 존재하지 않습니다."),
        OLD_REFRESH(403, "오래된 Refresh Token"),
        BAD_REFRESH(403, "잘못된 Refresh Token"),
        ;
        private final int status;
        private final String message;

        REFRESH_TOKEN_ERROR(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }

    public RefreshTokenException(REFRESH_TOKEN_ERROR error) {
        super(error.name());
        this.error = error;
    }

    public void addResponseError(HttpServletResponse response) {
        addTokenErrorResponse(response, error.getStatus(), error.getMessage());
    }
}
