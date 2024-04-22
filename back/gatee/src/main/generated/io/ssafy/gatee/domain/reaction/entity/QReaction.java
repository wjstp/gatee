package io.ssafy.gatee.domain.reaction.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReaction is a Querydsl query type for Reaction
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReaction extends EntityPathBase<Reaction> {

    private static final long serialVersionUID = 1190725251L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReaction reaction = new QReaction("reaction");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.member.entity.QMember member;

    public final io.ssafy.gatee.domain.photo.entity.QPhoto photo;

    public QReaction(String variable) {
        this(Reaction.class, forVariable(variable), INITS);
    }

    public QReaction(Path<? extends Reaction> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReaction(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReaction(PathMetadata metadata, PathInits inits) {
        this(Reaction.class, metadata, inits);
    }

    public QReaction(Class<? extends Reaction> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
        this.photo = inits.isInitialized("photo") ? new io.ssafy.gatee.domain.photo.entity.QPhoto(forProperty("photo"), inits.get("photo")) : null;
    }

}

