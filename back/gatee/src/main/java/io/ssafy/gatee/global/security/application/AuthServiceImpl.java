package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member.entity.Privilege;
import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
import io.ssafy.gatee.global.security.user.UserSecurityDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static io.ssafy.gatee.global.security.user.UserSecurityDTO.toUserSecurityDTO;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
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
    public UserSecurityDTO loadUserSecurityDTO(KakaoTokenRes socialData) {// member가 존재하는지 확인
        log.info(socialData.kakaoAccount().toString());
        Optional<Member> member = memberRepository.findByEmail(socialData.kakaoAccount().email());
        // 로그인
        if (member.isPresent()) {
            return toUserSecurityDTO(member.get());
        }
        // db에 없다면 회원가입
        return toUserSecurityDTO(register(socialData));
    }


    @Override
    @Transactional
    public Member register(KakaoTokenRes socialData) {
        return memberRepository.save(Member.builder()
                .email(socialData.kakaoAccount().email())
                .name(socialData.kakaoAccount().kakaoProfile().nickname())
                .privilege(Collections.singletonList(Privilege.ANONYMOUS))   //todo: 수정
                .build());
    }
}
