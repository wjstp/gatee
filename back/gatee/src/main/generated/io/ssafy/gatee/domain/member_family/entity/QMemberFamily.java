package io.ssafy.gatee.domain.member_family.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberFamily is a Querydsl query type for MemberFamily
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberFamily extends EntityPathBase<MemberFamily> {

    private static final long serialVersionUID = -2089338800L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberFamily memberFamily = new QMemberFamily("memberFamily");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final io.ssafy.gatee.domain.family.entity.QFamily family;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isLeader = createBoolean("isLeader");

    public final io.ssafy.gatee.domain.member.entity.QMember member;

    public final EnumPath<Role> role = createEnum("role", Role.class);

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMemberFamily(String variable) {
        this(MemberFamily.class, forVariable(variable), INITS);
    }

    public QMemberFamily(Path<? extends MemberFamily> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberFamily(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberFamily(PathMetadata metadata, PathInits inits) {
        this(MemberFamily.class, metadata, inits);
    }

    public QMemberFamily(Class<? extends MemberFamily> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.family = inits.isInitialized("family") ? new io.ssafy.gatee.domain.family.entity.QFamily(forProperty("family"), inits.get("family")) : null;
        this.member = inits.isInitialized("member") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

