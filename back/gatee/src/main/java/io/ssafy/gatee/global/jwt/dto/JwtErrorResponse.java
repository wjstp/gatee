package io.ssafy.gatee.global.jwt.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonPropertyOrder({"code", "message", "time"})
public class JwtErrorResponse {
    private int code;
    private String message;
    private String time;

    @Builder
    public JwtErrorResponse(int code, String message) {
        this.code = code;
        this.message = message;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        this.time = LocalDateTime.now().format(formatter);
    }

    public LocalDateTime getLocalDateTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        return LocalDateTime.parse(this.time, formatter);
    }

    public LocalDate getLocalDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        return LocalDate.parse(this.time, formatter);
    }
}
