package io.ssafy.gatee.domain.push_notification.entity;


import lombok.Builder;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;

@Getter
@Builder
@Document(collection = "push_notification")
public class PushNotifications {

    @Id
    private ObjectId notificationId;

    private String type;

    @Field(name = "type_id")
    private Long typeId;

    @Field(name = "sender_id")
    private String senderId;

    @Field(name = "receiver_id")
    private String receiverId;

    private String title;

    private String content;

    @Field(name = "is_check")
    private boolean isCheck;

    @Field(name="created_at")
    private String createdAt;

    public void checkPushNotifications() {
        this.isCheck = true;
    }
}
