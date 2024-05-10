package io.ssafy.gatee.global.websocket.interceptor;

import io.ssafy.gatee.global.jwt.util.JwtClaimsParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtClaimsParser jwtClaimsParser;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        Map<String, List<String>> params = UriComponentsBuilder.fromUri(request.getURI()).build().getQueryParams();
        List<String> tokens = params.get("Token");
        if (tokens == null || tokens.isEmpty()) {
            return false; // 토큰이 없는 경우, 핸드셰이크 거부
        }

        String token = tokens.get(0);

        return jwtClaimsParser.validateToken(token);
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
