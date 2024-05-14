package io.ssafy.gatee.domain.photo.dao;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.domain.photo.entity.QPhoto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PhotoRepositoryCustomImpl implements PhotoRepositoryCustom {
    private final JPQLQueryFactory jpqlQueryFactory;


    @Override
    public List<Photo> findPhotoListByDay(List<MemberFamily> memberFamilyList) {

        QPhoto photo = QPhoto.photo;

        return jpqlQueryFactory.selectFrom(photo)
                .where(photo.memberFamily.in(memberFamilyList))
                .orderBy(photo.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Photo> findPhotoListByMonth(List<MemberFamily> memberFamilyList, String year, String month) {
        QPhoto photo = QPhoto.photo;

        return jpqlQueryFactory.selectFrom(photo)
                .where(photo.memberFamily.in(memberFamilyList))
                .where(photo.createdAt.year().eq(Integer.valueOf(year)))
                .where(photo.createdAt.month().eq(Integer.valueOf(month)))
                .orderBy(photo.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Photo> findPhotoListByYear(List<MemberFamily> memberFamilyList, String year) {
        QPhoto photo = QPhoto.photo;

        return jpqlQueryFactory.selectFrom(photo)
                .where(photo.memberFamily.in(memberFamilyList))
                .where(photo.createdAt.year().eq(Integer.valueOf(year)))
                .orderBy(photo.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Photo> findPhotoThumbnailListByMonth(List<MemberFamily> memberFamilyList) {
        QPhoto photo = QPhoto.photo;

        return jpqlQueryFactory.selectFrom(photo)
                .where(photo.createdAt.in(
                        JPAExpressions.select(photo.createdAt.min())
                                .from(photo)
                                .groupBy(photo.createdAt.year(), photo.createdAt.month())
                ))
                .orderBy(photo.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Photo> findPhotoThumbnailListByYear(List<MemberFamily> memberFamilyList) {
        QPhoto photo = QPhoto.photo;

        return jpqlQueryFactory.selectFrom(photo)
                .where(photo.createdAt.in(
                        JPAExpressions.select(photo.createdAt.min())
                                .from(photo)
                                .groupBy(photo.createdAt.year())
                ))
                .orderBy(photo.createdAt.desc())
                .fetch();
    }

    @Override
    public List<Photo> findAllPhotoByFamily(Family family) {
        QPhoto photo = QPhoto.photo;

        return jpqlQueryFactory.selectFrom(photo)
                .where(photo.memberFamily.family.eq(family))
                .where(photo.status.eq(true))
                .fetch();
    }
}
