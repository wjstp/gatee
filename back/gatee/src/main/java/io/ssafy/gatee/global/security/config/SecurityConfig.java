package io.ssafy.gatee.global.security.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Log4j2
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final String[] WHITE_LIST_URL = {
            "/oauth2/authorization/kakao", "/auth/refresh",  "/api/login",
            "/docs/**",
    };

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // csrf를 disable 설정 : stateless 상태로 관리하기 때문에 csrf 공격을 관리하지 않아도 됨
        http.csrf(AbstractHttpConfigurer::disable)
                // 세션 설정 - stateless
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 경로별 인가작업
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers(WHITE_LIST_URL).permitAll()
                        .requestMatchers("/api/members").hasRole("ANONYMOUS")   // 회원가입 후 정보 등록 페이지는 anony
                        .anyRequest().authenticated());
//                .oauth2Login(
//                        oauth2 -> oauth2
//                                .successHandler(new CustomOauth2SuccessHandler(jwtUtil, jwtService))
//                                .failureHandler(new CustomOauth2FailureHandler())
//                )
//                .exceptionHandling(
//                        configurer -> configurer.accessDeniedHandler(new CustomAccessDeniedHandler())
////                                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
//                )
                // http basic auth 기반으로 한 로그인 인증창 사용하지않으므로 disable
//                .httpBasic(AbstractHttpConfigurer::disable)
                // jwtfilter 등록 - UsernamePasswordAuthenticationFilter 전
//                .addFilterBefore(new JwtFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
