package io.ssafy.gatee.domain.family.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFamily is a Querydsl query type for Family
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFamily extends EntityPathBase<Family> {

    private static final long serialVersionUID = -1704109767L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFamily family = new QFamily("family");

    public final io.ssafy.gatee.domain.file.entity.QFile file;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public QFamily(String variable) {
        this(Family.class, forVariable(variable), INITS);
    }

    public QFamily(Path<? extends Family> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFamily(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFamily(PathMetadata metadata, PathInits inits) {
        this(Family.class, metadata, inits);
    }

    public QFamily(Class<? extends Family> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.file = inits.isInitialized("file") ? new io.ssafy.gatee.domain.file.entity.QFile(forProperty("file")) : null;
    }

}

