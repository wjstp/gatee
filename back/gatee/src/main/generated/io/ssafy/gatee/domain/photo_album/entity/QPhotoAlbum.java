package io.ssafy.gatee.domain.photo_album.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhotoAlbum is a Querydsl query type for PhotoAlbum
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhotoAlbum extends EntityPathBase<PhotoAlbum> {

    private static final long serialVersionUID = -991471160L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhotoAlbum photoAlbum = new QPhotoAlbum("photoAlbum");

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

    public QPhotoAlbum(String variable) {
        this(PhotoAlbum.class, forVariable(variable), INITS);
    }

    public QPhotoAlbum(Path<? extends PhotoAlbum> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhotoAlbum(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhotoAlbum(PathMetadata metadata, PathInits inits) {
        this(PhotoAlbum.class, metadata, inits);
    }

    public QPhotoAlbum(Class<? extends PhotoAlbum> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.album = inits.isInitialized("album") ? new io.ssafy.gatee.domain.album.entity.QAlbum(forProperty("album")) : null;
        this.photo = inits.isInitialized("photo") ? new io.ssafy.gatee.domain.photo.entity.QPhoto(forProperty("photo"), inits.get("photo")) : null;
    }

}

