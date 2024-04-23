package io.ssafy.gatee.global.security.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizationFailureHandler;
import org.springframework.security.oauth2.core.OAuth2AuthorizationException;

import java.util.Map;

@Slf4j
public class CustomOAuth2FailureHandler implements OAuth2AuthorizationFailureHandler {
    @Override
    public void onAuthorizationFailure(OAuth2AuthorizationException authorizationException, Authentication principal, Map<String, Object> attributes) {

    }
}
