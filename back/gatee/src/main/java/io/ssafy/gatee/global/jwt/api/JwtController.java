package io.ssafy.gatee.global.jwt.api;

import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.jwt.exception.RefreshTokenException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@Slf4j
@RestController
@RequestMapping("/api/jwt")
@RequiredArgsConstructor
public class JwtController {

    private final JwtService jwtService;

    @PostMapping("/rotate-token")
    public void rotateAccessToken(HttpServletRequest request, HttpServletResponse response) {
        try {
            log.info("액세스 토큰 재발급 시작");
            String refreshToken = this.getCookie(request).getValue();
            log.info("refresh Token : " + refreshToken);
            String accessToken = jwtService.rotateAccessToken(refreshToken);
            response.addHeader("Access-Token", "Bearer " + accessToken);
        } catch (RefreshTokenException refreshTokenException) {
            refreshTokenException.addResponseError(response);
        }
    }

    private Cookie getCookie(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("Refresh-Token"))
                .findFirst()
                .orElseThrow(() -> new RefreshTokenException(RefreshTokenException.REFRESH_TOKEN_ERROR.NO_REFRESH));
    }
}
