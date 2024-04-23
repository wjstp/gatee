package io.ssafy.gatee.domain.feature.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFeature is a Querydsl query type for Feature
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFeature extends EntityPathBase<Feature> {

    private static final long serialVersionUID = 1885327127L;

    public static final QFeature feature = new QFeature("feature");

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

    public QFeature(String variable) {
        super(Feature.class, forVariable(variable));
    }

    public QFeature(Path<? extends Feature> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFeature(PathMetadata metadata) {
        super(Feature.class, metadata);
    }

}

