package io.ssafy.gatee.domain.family_chatroom.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFamilyChatroom is a Querydsl query type for FamilyChatroom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFamilyChatroom extends EntityPathBase<FamilyChatroom> {

    private static final long serialVersionUID = -454736338L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFamilyChatroom familyChatroom = new QFamilyChatroom("familyChatroom");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    public final io.ssafy.gatee.domain.chatroom.entity.QChatRoom chatRoom;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final io.ssafy.gatee.domain.family.entity.QFamily family;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QFamilyChatroom(String variable) {
        this(FamilyChatroom.class, forVariable(variable), INITS);
    }

    public QFamilyChatroom(Path<? extends FamilyChatroom> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFamilyChatroom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFamilyChatroom(PathMetadata metadata, PathInits inits) {
        this(FamilyChatroom.class, metadata, inits);
    }

    public QFamilyChatroom(Class<? extends FamilyChatroom> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new io.ssafy.gatee.domain.chatroom.entity.QChatRoom(forProperty("chatRoom")) : null;
        this.family = inits.isInitialized("family") ? new io.ssafy.gatee.domain.family.entity.QFamily(forProperty("family"), inits.get("family")) : null;
    }

}

