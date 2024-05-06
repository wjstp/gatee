package io.ssafy.gatee.domain.push_notification.dto.request;

import java.util.UUID;

public record NaggingReq (

        UUID receiverId,

        String message
){
}
