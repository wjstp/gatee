package io.ssafy.gatee.global.security.application;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;

import java.util.Map;

public class KakaoOAuth2Processor extends OAuth2RequestProcessor{

    public KakaoOAuth2Processor(OAuth2UserRequest oAuth2UserRequest) {
        super(oAuth2UserRequest);
    }

    @Override
    String getEmail(Map<String, Object> attributes) {
        return null;
    }
}
