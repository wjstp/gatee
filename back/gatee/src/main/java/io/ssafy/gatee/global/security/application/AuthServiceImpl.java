package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthServiceImpl implements AuthService {

    @Value("${spring.security.oauth2.provider.kakao.user-info-uri}")
    private String KAKAO_USER_INFO_URL;
    @Override
    public KakaoTokenRes requestKakaoUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        ResponseEntity<KakaoTokenRes> response = restTemplate.postForEntity(KAKAO_USER_INFO_URL, entity, KakaoTokenRes.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            // 사용자 검색 로직
            return response.getBody();
        }
        throw new RuntimeException();   // todo : exception 수정
    }
}
