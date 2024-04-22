package io.ssafy.gatee.domain.photo_group.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhotoGroup is a Querydsl query type for PhotoGroup
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhotoGroup extends EntityPathBase<PhotoGroup> {

    private static final long serialVersionUID = -1236376088L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhotoGroup photoGroup = new QPhotoGroup("photoGroup");

    public final io.ssafy.gatee.domain.group.entity.QGroup group;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.photo.entity.QPhoto photo;

    public QPhotoGroup(String variable) {
        this(PhotoGroup.class, forVariable(variable), INITS);
    }

    public QPhotoGroup(Path<? extends PhotoGroup> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhotoGroup(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhotoGroup(PathMetadata metadata, PathInits inits) {
        this(PhotoGroup.class, metadata, inits);
    }

    public QPhotoGroup(Class<? extends PhotoGroup> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.group = inits.isInitialized("group") ? new io.ssafy.gatee.domain.group.entity.QGroup(forProperty("group")) : null;
        this.photo = inits.isInitialized("photo") ? new io.ssafy.gatee.domain.photo.entity.QPhoto(forProperty("photo"), inits.get("photo")) : null;
    }

}

