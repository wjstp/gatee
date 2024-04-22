package io.ssafy.gatee.domain.emoticon.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmoticon is a Querydsl query type for Emoticon
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmoticon extends EntityPathBase<Emoticon> {

    private static final long serialVersionUID = -1316457155L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEmoticon emoticon = new QEmoticon("emoticon");

    public final io.ssafy.gatee.domain.file.entity.QFile file;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public QEmoticon(String variable) {
        this(Emoticon.class, forVariable(variable), INITS);
    }

    public QEmoticon(Path<? extends Emoticon> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEmoticon(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEmoticon(PathMetadata metadata, PathInits inits) {
        this(Emoticon.class, metadata, inits);
    }

    public QEmoticon(Class<? extends Emoticon> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.file = inits.isInitialized("file") ? new io.ssafy.gatee.domain.file.entity.QFile(forProperty("file")) : null;
    }

}

