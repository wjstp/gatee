package io.ssafy.gatee.global.jwt.dao;

import io.ssafy.gatee.global.jwt.dto.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

// todo: redistemplate이 더 빠르다. redistemplate으로 변경할 것
public interface RefreshTokenRedisRepository extends CrudRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByMemberId(String memberId);
    boolean existsByMemberId(String memberId);
    void deleteByMemberId(String memberId);
}
