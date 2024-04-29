package io.ssafy.gatee.domain.photo.dto.response;

import io.ssafy.gatee.domain.reaction.dto.response.ReactionMemberRes;
import io.ssafy.gatee.domain.reaction.entity.Reaction;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record PhotoDetailRes(

        @NotNull
        Long photoId,

        @NotNull
        String imageUrl,

        @NotNull
        List<ReactionMemberRes> reactionList,

        @NotNull
        boolean isReaction
) {
}
