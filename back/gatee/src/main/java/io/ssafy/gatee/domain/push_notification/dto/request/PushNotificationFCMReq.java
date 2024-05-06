package io.ssafy.gatee.domain.push_notification.dto.request;

import io.ssafy.gatee.domain.push_notification.entity.Type;
import lombok.Builder;

import java.util.List;

@Builder
public record PushNotificationFCMReq(

        Type type,

        List<String> receiverTokenList,

        Long typeId,

        String title,

        String content

) {
//    public toDto() {
//
//    }
}
