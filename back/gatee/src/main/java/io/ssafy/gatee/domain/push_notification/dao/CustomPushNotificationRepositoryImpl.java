package io.ssafy.gatee.domain.push_notification.dao;

import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationPageRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Log4j2
@Repository
@RequiredArgsConstructor
public class CustomPushNotificationRepositoryImpl implements CustomPushNotificationRepository{

    private final MongoTemplate mongoTemplate;
    private final String COLLECTION_NAME = "push_notification";
    @Override
    public PushNotificationRes findMyPushNotifications(String receiverId, String cursor, Pageable pageable) {
        Query query = new Query().addCriteria(Criteria.where("id").gt(cursor)).with(pageable);


        List<PushNotificationPageRes> productsList = mongoTemplate.find(query, Products.class)
                .stream()
                .map(ProductsListDto::toDto)
                .collect(Collectors.toList());
        boolean hasNext = mongoTemplate.count(query, Products.class) >= pageable.getPageSize();
        var nextCursor = hasNext ? productsList.get(productsList.size() - 1).id() : null;
        productsList.remove(productsList.size() - 1);
        return ProductsPageRes.builder()
                .content(productsList)
                .nextCursor(nextCursor)
                .build();
        return null;
    }
}
