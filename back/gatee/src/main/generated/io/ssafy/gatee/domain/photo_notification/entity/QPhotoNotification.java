package io.ssafy.gatee.domain.photo_notification.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhotoNotification is a Querydsl query type for PhotoNotification
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhotoNotification extends EntityPathBase<PhotoNotification> {

    private static final long serialVersionUID = 1377626452L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhotoNotification photoNotification = new QPhotoNotification("photoNotification");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.notification.entity.QNotification notification;

    public final io.ssafy.gatee.domain.photo.entity.QPhoto photo;

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QPhotoNotification(String variable) {
        this(PhotoNotification.class, forVariable(variable), INITS);
    }

    public QPhotoNotification(Path<? extends PhotoNotification> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhotoNotification(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhotoNotification(PathMetadata metadata, PathInits inits) {
        this(PhotoNotification.class, metadata, inits);
    }

    public QPhotoNotification(Class<? extends PhotoNotification> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.notification = inits.isInitialized("notification") ? new io.ssafy.gatee.domain.notification.entity.QNotification(forProperty("notification")) : null;
        this.photo = inits.isInitialized("photo") ? new io.ssafy.gatee.domain.photo.entity.QPhoto(forProperty("photo"), inits.get("photo")) : null;
    }

}

