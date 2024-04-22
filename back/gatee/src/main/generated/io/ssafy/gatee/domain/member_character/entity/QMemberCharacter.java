package io.ssafy.gatee.domain.member_character.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberCharacter is a Querydsl query type for MemberCharacter
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberCharacter extends EntityPathBase<MemberCharacter> {

    private static final long serialVersionUID = 1263026202L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberCharacter memberCharacter = new QMemberCharacter("memberCharacter");

    public final StringPath answer = createString("answer");

    public final io.ssafy.gatee.domain.character.entity.QCharacter character;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.member.entity.QMember member;

    public final ListPath<String, StringPath> wrongAnswer = this.<String, StringPath>createList("wrongAnswer", String.class, StringPath.class, PathInits.DIRECT2);

    public QMemberCharacter(String variable) {
        this(MemberCharacter.class, forVariable(variable), INITS);
    }

    public QMemberCharacter(Path<? extends MemberCharacter> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberCharacter(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberCharacter(PathMetadata metadata, PathInits inits) {
        this(MemberCharacter.class, metadata, inits);
    }

    public QMemberCharacter(Class<? extends MemberCharacter> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.character = inits.isInitialized("character") ? new io.ssafy.gatee.domain.character.entity.QCharacter(forProperty("character")) : null;
        this.member = inits.isInitialized("member") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

