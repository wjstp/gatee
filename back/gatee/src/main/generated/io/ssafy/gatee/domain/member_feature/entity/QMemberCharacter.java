package io.ssafy.gatee.domain.member_feature.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;
import io.ssafy.gatee.domain.feature.entity.QCharacter;


/**
 * QMemberCharacter is a Querydsl query type for MemberCharacter
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberCharacter extends EntityPathBase<MemberFeature> {

    private static final long serialVersionUID = 1263026202L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberCharacter memberCharacter = new QMemberCharacter("memberCharacter");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    public final StringPath answer = createString("answer");

    public final QCharacter character;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.member.entity.QMember member;

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final ListPath<String, StringPath> wrongAnswer = this.<String, StringPath>createList("wrongAnswer", String.class, StringPath.class, PathInits.DIRECT2);

    public QMemberCharacter(String variable) {
        this(MemberFeature.class, forVariable(variable), INITS);
    }

    public QMemberCharacter(Path<? extends MemberFeature> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberCharacter(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberCharacter(PathMetadata metadata, PathInits inits) {
        this(MemberFeature.class, metadata, inits);
    }

    public QMemberCharacter(Class<? extends MemberFeature> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.character = inits.isInitialized("character") ? new QCharacter(forProperty("character")) : null;
        this.member = inits.isInitialized("member") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

