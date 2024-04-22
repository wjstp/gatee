package io.ssafy.gatee.domain.character.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCharacter is a Querydsl query type for Character
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCharacter extends EntityPathBase<Character> {

    private static final long serialVersionUID = 1588826679L;

    public static final QCharacter character = new QCharacter("character");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath question = createString("question");

    public final EnumPath<Type> type = createEnum("type", Type.class);

    public QCharacter(String variable) {
        super(Character.class, forVariable(variable));
    }

    public QCharacter(Path<? extends Character> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCharacter(PathMetadata metadata) {
        super(Character.class, metadata);
    }

}

