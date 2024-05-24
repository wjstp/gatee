package io.ssafy.gatee.global.jwt.exception;

import com.google.gson.Gson;
import io.ssafy.gatee.global.jwt.dto.JwtErrorResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;

import java.io.IOException;

public class JwtException extends RuntimeException {
    public JwtException(String message) {
        super(message);
    }

    protected static void addTokenErrorResponse(HttpServletResponse response, int status, String message) {
        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        var errorResponse = JwtErrorResponse.builder()
                .code(status)
                .message(message)
                .build();

        Gson gson = new Gson();
        try {
            response.getWriter().println(gson.toJson(errorResponse));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
