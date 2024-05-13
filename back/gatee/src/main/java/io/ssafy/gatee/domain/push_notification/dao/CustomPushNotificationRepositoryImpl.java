package io.ssafy.gatee.domain.push_notification.dao;

import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationPageRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationRes;
import io.ssafy.gatee.domain.push_notification.entity.PushNotifications;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Log4j2
@Repository
@RequiredArgsConstructor
public class CustomPushNotificationRepositoryImpl implements CustomPushNotificationRepository{

    private final MongoTemplate mongoTemplate;

    @Override
    public PushNotificationPageRes findMyPushNotifications(String receiverId, Pageable pageable, String cursor) {
        Query query = new Query();
        query.addCriteria(Criteria.where("receiver_id").is(receiverId)).with(pageable);
        if (!isNull(cursor) && !cursor.isEmpty()) {
            query.addCriteria(Criteria.where("id").lt(new ObjectId(cursor)));
        }
        List<PushNotificationRes> pushNotification = mongoTemplate.find(query, PushNotifications.class)
                .stream()
                .map(PushNotificationRes::toDto)
                .collect(Collectors.toList());
        if (pushNotification.size() > pageable.getPageSize()) {
            pushNotification.subList(0, pushNotification.size()-1);
        }
        boolean hasNext = mongoTemplate.count(query, PushNotifications.class) >= pageable.getPageSize();
        var nextCursor = hasNext ? pushNotification.get(pushNotification.size() - 1).notificationId() : null;
        return PushNotificationPageRes.builder()
                .pushNotificationResList(pushNotification)
                .nextCursor(nextCursor)
                .hasNext(hasNext)
                .build();
    }
}
