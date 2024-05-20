package io.ssafy.gatee.global.redis.dao;

import io.ssafy.gatee.global.redis.dto.OnlineRoomMember;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OnlineRoomMemberRepository extends CrudRepository<OnlineRoomMember, UUID> {
}
