package io.ssafy.gatee.domain.photo_notification.entity;

import io.ssafy.gatee.domain.notification.entity.Notification;
import io.ssafy.gatee.domain.photo.entity.Photo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhotoNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;
}
