package io.ssafy.gatee.domain.member_notification.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberNotification is a Querydsl query type for MemberNotification
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberNotification extends EntityPathBase<MemberNotification> {

    private static final long serialVersionUID = 1018273502L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberNotification memberNotification = new QMemberNotification("memberNotification");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final io.ssafy.gatee.domain.member.entity.QMember fromMember;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.notification.entity.QNotification notification;

    //inherited
    public final BooleanPath status = _super.status;

    public final io.ssafy.gatee.domain.member.entity.QMember toMember;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMemberNotification(String variable) {
        this(MemberNotification.class, forVariable(variable), INITS);
    }

    public QMemberNotification(Path<? extends MemberNotification> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberNotification(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberNotification(PathMetadata metadata, PathInits inits) {
        this(MemberNotification.class, metadata, inits);
    }

    public QMemberNotification(Class<? extends MemberNotification> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fromMember = inits.isInitialized("fromMember") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("fromMember"), inits.get("fromMember")) : null;
        this.notification = inits.isInitialized("notification") ? new io.ssafy.gatee.domain.notification.entity.QNotification(forProperty("notification")) : null;
        this.toMember = inits.isInitialized("toMember") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("toMember"), inits.get("toMember")) : null;
    }

}

