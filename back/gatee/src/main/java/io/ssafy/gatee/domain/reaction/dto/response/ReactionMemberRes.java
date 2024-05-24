package io.ssafy.gatee.domain.reaction.dto.response;

import io.ssafy.gatee.domain.reaction.entity.Reaction;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record ReactionMemberRes(
        @NotNull
        UUID memberId,

        @NotNull
        String content
) {
    public static ReactionMemberRes toDto(Reaction reaction) {
        return ReactionMemberRes.builder()
                .memberId(reaction.getMember().getId())
                .content(reaction.getContent())
                .build();
    }
}
