package io.ssafy.gatee.domain.member_family_exam.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberFamilyExam is a Querydsl query type for MemberFamilyExam
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberFamilyExam extends EntityPathBase<MemberFamilyExam> {

    private static final long serialVersionUID = -2064423677L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberFamilyExam memberFamilyExam = new QMemberFamilyExam("memberFamilyExam");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    public final StringPath answer = createString("answer");

    public final StringPath choice = createString("choice");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final io.ssafy.gatee.domain.exam.entity.QExam exam;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.member_family.entity.QMemberFamily memberFamily;

    public final StringPath problem = createString("problem");

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final ListPath<String, StringPath> wrongAnswer = this.<String, StringPath>createList("wrongAnswer", String.class, StringPath.class, PathInits.DIRECT2);

    public QMemberFamilyExam(String variable) {
        this(MemberFamilyExam.class, forVariable(variable), INITS);
    }

    public QMemberFamilyExam(Path<? extends MemberFamilyExam> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberFamilyExam(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberFamilyExam(PathMetadata metadata, PathInits inits) {
        this(MemberFamilyExam.class, metadata, inits);
    }

    public QMemberFamilyExam(Class<? extends MemberFamilyExam> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.exam = inits.isInitialized("exam") ? new io.ssafy.gatee.domain.exam.entity.QExam(forProperty("exam")) : null;
        this.memberFamily = inits.isInitialized("memberFamily") ? new io.ssafy.gatee.domain.member_family.entity.QMemberFamily(forProperty("memberFamily"), inits.get("memberFamily")) : null;
    }

}

