package io.ssafy.gatee.global.jwt.dao;

import io.ssafy.gatee.global.jwt.dto.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

// todo: redistemplate이 더 빠르다. redistemplate으로 변경할 것
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByAccessToken(String accessToken);
}
