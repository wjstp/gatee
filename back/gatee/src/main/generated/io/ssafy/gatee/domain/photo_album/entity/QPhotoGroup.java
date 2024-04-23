package io.ssafy.gatee.domain.photo_album.entity;

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
public class QPhotoGroup extends EntityPathBase<PhotoAlbum> {

    private static final long serialVersionUID = -1236376088L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhotoGroup photoGroup = new QPhotoGroup("photoGroup");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    public final io.ssafy.gatee.domain.album.entity.QAlbum album;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.photo.entity.QPhoto photo;

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QPhotoGroup(String variable) {
        this(PhotoAlbum.class, forVariable(variable), INITS);
    }

    public QPhotoGroup(Path<? extends PhotoAlbum> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhotoGroup(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhotoGroup(PathMetadata metadata, PathInits inits) {
        this(PhotoAlbum.class, metadata, inits);
    }

    public QPhotoGroup(Class<? extends PhotoAlbum> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.album = inits.isInitialized("album") ? new io.ssafy.gatee.domain.album.entity.QAlbum(forProperty("album")) : null;
        this.photo = inits.isInitialized("photo") ? new io.ssafy.gatee.domain.photo.entity.QPhoto(forProperty("photo"), inits.get("photo")) : null;
    }

}

