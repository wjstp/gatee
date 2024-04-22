package io.ssafy.gatee.domain.member_family_mission.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberFamilyMission is a Querydsl query type for MemberFamilyMission
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberFamilyMission extends EntityPathBase<MemberFamilyMission> {

    private static final long serialVersionUID = -798377041L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberFamilyMission memberFamilyMission = new QMemberFamilyMission("memberFamilyMission");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.member_family.entity.QMemberFamily memberFamily;

    public final io.ssafy.gatee.domain.mission.entity.QMission mission;

    public final NumberPath<Integer> processCount = createNumber("processCount", Integer.class);

    public QMemberFamilyMission(String variable) {
        this(MemberFamilyMission.class, forVariable(variable), INITS);
    }

    public QMemberFamilyMission(Path<? extends MemberFamilyMission> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberFamilyMission(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberFamilyMission(PathMetadata metadata, PathInits inits) {
        this(MemberFamilyMission.class, metadata, inits);
    }

    public QMemberFamilyMission(Class<? extends MemberFamilyMission> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberFamily = inits.isInitialized("memberFamily") ? new io.ssafy.gatee.domain.member_family.entity.QMemberFamily(forProperty("memberFamily"), inits.get("memberFamily")) : null;
        this.mission = inits.isInitialized("mission") ? new io.ssafy.gatee.domain.mission.entity.QMission(forProperty("mission")) : null;
    }

}

