package io.ssafy.gatee.domain.unreadmember.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUnreadMember is a Querydsl query type for UnreadMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUnreadMember extends EntityPathBase<UnreadMember> {

    private static final long serialVersionUID = -986675869L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUnreadMember unreadMember = new QUnreadMember("unreadMember");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    public final io.ssafy.gatee.domain.chatmessage.entity.QChatMessage chatMessage;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.member.entity.QMember member;

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QUnreadMember(String variable) {
        this(UnreadMember.class, forVariable(variable), INITS);
    }

    public QUnreadMember(Path<? extends UnreadMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUnreadMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUnreadMember(PathMetadata metadata, PathInits inits) {
        this(UnreadMember.class, metadata, inits);
    }

    public QUnreadMember(Class<? extends UnreadMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatMessage = inits.isInitialized("chatMessage") ? new io.ssafy.gatee.domain.chatmessage.entity.QChatMessage(forProperty("chatMessage"), inits.get("chatMessage")) : null;
        this.member = inits.isInitialized("member") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

