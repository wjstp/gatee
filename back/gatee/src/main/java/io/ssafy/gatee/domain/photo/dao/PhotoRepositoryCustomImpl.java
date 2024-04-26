package io.ssafy.gatee.domain.photo.dao;

import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.domain.photo.entity.QPhoto;
import lombok.RequiredArgsConstructor;
import org.joda.time.Days;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Date;
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
}
