package io.ssafy.gatee.domain.member_appointment.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberAppointment is a Querydsl query type for MemberAppointment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberAppointment extends EntityPathBase<MemberAppointment> {

    private static final long serialVersionUID = 1527079002L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberAppointment memberAppointment = new QMemberAppointment("memberAppointment");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    public final io.ssafy.gatee.domain.appointment.entity.QAppointment appointment;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.member.entity.QMember member;

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMemberAppointment(String variable) {
        this(MemberAppointment.class, forVariable(variable), INITS);
    }

    public QMemberAppointment(Path<? extends MemberAppointment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberAppointment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberAppointment(PathMetadata metadata, PathInits inits) {
        this(MemberAppointment.class, metadata, inits);
    }

    public QMemberAppointment(Class<? extends MemberAppointment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.appointment = inits.isInitialized("appointment") ? new io.ssafy.gatee.domain.appointment.entity.QAppointment(forProperty("appointment"), inits.get("appointment")) : null;
        this.member = inits.isInitialized("member") ? new io.ssafy.gatee.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

