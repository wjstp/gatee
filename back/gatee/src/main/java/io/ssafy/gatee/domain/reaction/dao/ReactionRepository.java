package io.ssafy.gatee.domain.reaction.dao;

import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.domain.reaction.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    List<Reaction> findAllByPhoto(Photo photo);

    Reaction findReactionByMemberAndPhoto(Member member, Photo photo);
}
