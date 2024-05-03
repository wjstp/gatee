package io.ssafy.gatee.domain.push_notification.dto.request;

import io.ssafy.gatee.domain.push_notification.entity.Type;
import java.util.List;

public record PushNotificationFCMReq(

        Type type,

        String senderToken,

        List<String> receiverTokenList,

        Long typeId,

        String title,

        String content

) {
//    public toDto() {
//
//    }
}
