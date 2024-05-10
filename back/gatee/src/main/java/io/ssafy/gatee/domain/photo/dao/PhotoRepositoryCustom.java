package io.ssafy.gatee.domain.photo.dao;

import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.photo.entity.Photo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepositoryCustom {
    List<Photo> findPhotoListByDay(List<MemberFamily> memberFamilyList);
    List<Photo> findPhotoListByMonth(List<MemberFamily> memberFamilyList,String year , String month);
    List<Photo> findPhotoListByYear(List<MemberFamily> memberFamilyList, String year);
    List<Photo> findPhotoThumbnailListByMonth(List<MemberFamily> memberFamilyList);
    List<Photo> findPhotoThumbnailListByYear(List<MemberFamily> memberFamilyList);
}
