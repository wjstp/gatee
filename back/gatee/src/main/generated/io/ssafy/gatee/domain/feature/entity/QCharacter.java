package io.ssafy.gatee.domain.feature.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCharacter is a Querydsl query type for Character
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCharacter extends EntityPathBase<Feature> {

    private static final long serialVersionUID = 1588826679L;

    public static final QCharacter character = new QCharacter("character");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath question = createString("question");

    //inherited
    public final BooleanPath status = _super.status;

    public final EnumPath<Type> type = createEnum("type", Type.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QCharacter(String variable) {
        super(Feature.class, forVariable(variable));
    }

    public QCharacter(Path<? extends Feature> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCharacter(PathMetadata metadata) {
        super(Feature.class, metadata);
    }

}

