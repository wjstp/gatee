package io.ssafy.gatee.domain.push_notification.entity;


import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Document(collection = "push_notification")
public class PushNotifications {

    private Long id;

    private String type;

    private Long typeId;

    private String senderId;

    private List<String> receiverId;

    private String title;

    private String content;

    private boolean isCheck;
}
