package io.ssafy.gatee.global.security.config;

import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.jwt.filter.JwtFilter;
import io.ssafy.gatee.global.security.filter.CustomOAuth2LoginFilter;
import io.ssafy.gatee.global.security.handler.CustomOAuth2FailureHandler;
import io.ssafy.gatee.global.security.handler.CustomOAuth2SuccessHandler;
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
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Log4j2
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final String[] URL_WHITE_LIST = {
            "/oauth2/authorization/kakao", "/auth/refresh", "/api/login",
            "/docs/**",
    };

    private final JwtService jwtService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers(URL_WHITE_LIST).permitAll()
                        // 회원가입 후 정보 등록 페이지는 anonymous만 접근 가능, 정보등록을 하지 않은 유저는 다른 페이지에 접근 불가
                        .requestMatchers("/api/members").hasRole("ANONYMOUS")
                        .anyRequest().authenticated())
                .oauth2Login(
                        oauth2 -> oauth2
                                .successHandler(new CustomOAuth2SuccessHandler())
                                .failureHandler(new CustomOAuth2FailureHandler())
                )
//                .exceptionHandling(
//                        configurer -> configurer.accessDeniedHandler(new CustomAccessDeniedHandler())
//                                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
//                )
//                .addFilterAt(new CustomOAuth2LoginFilter(), OAuth2LoginAuthenticationFilter.class)
                .addFilterBefore(new JwtFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
