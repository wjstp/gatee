package io.ssafy.gatee.global.security.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizationSuccessHandler;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;

import java.util.Map;

@Slf4j
public class CustomOAuth2SuccessHandler implements OAuth2AuthorizationSuccessHandler {
    @Override
    public void onAuthorizationSuccess(OAuth2AuthorizedClient authorizedClient, Authentication principal, Map<String, Object> attributes) {

    }
}
