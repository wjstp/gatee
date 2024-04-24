package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
import io.ssafy.gatee.global.security.user.UserSecurityDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Value("${spring.security.oauth2.provider.kakao.user-info-uri}")
    private String KAKAO_USER_INFO_URL;

    private final MemberRepository memberRepository;
    @Override
    public KakaoTokenRes requestKakaoUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        ResponseEntity<KakaoTokenRes> response = restTemplate.postForEntity(KAKAO_USER_INFO_URL, entity, KakaoTokenRes.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        }
        throw new RuntimeException();   // todo : exception 수정
    }

    @Override
    public UserSecurityDTO loadUserSecurityDTO(KakaoTokenRes socialData) {
        // todo: social type에 따라 바뀌게 수정할 것
        // member가 존재하는지 확인
        var member = memberRepository.findByEmail(socialData.kakaoAccount().email());
        if (member.isPresent()) {
            // 로그인
            return UserSecurityDTO.builder()
                    .memberId(member.get().getId())
                    .build();   // todo: 수정
        }
        // db에 없다면 회원가입
        // todo: userSecuritydto로 변경
        return UserSecurityDTO.builder()
                .memberId(register(socialData).getId())
                .build();
    }

    @Override
    @Transactional
    public Member register(KakaoTokenRes socialData) {
        return memberRepository.save(Member.builder()
                        .email(socialData.kakaoAccount().email())
                        .name(socialData.kakaoAccount().kakaoProfile().nickname())
                        .build());
    }

}
