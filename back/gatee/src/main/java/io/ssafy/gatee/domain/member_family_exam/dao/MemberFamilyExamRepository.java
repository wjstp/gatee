package io.ssafy.gatee.domain.member_family_exam.dao;

import io.ssafy.gatee.domain.exam.dto.response.ExamFamilyRes;
import io.ssafy.gatee.domain.member_family_exam.entity.MemberFamilyExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MemberFamilyExamRepository extends JpaRepository<MemberFamilyExam, Long> {

    List<MemberFamilyExam> findByExam_Id(Long examId);

    @Query("""
       select new io.ssafy.gatee.domain.exam.dto.response.ExamFamilyRes(
         mf.memberFamily.member.nickname, mf.memberFamily.member.id, avg(mf.exam.score)
       ) 
       from Exam e
       join MemberFamilyExam mf
       on mf.exam.id = e.id
       where mf.memberFamily.family = (select f.family from MemberFamily f where f.member.id = :memberId)
       group by mf.memberFamily  
        """)
    List<ExamFamilyRes> findFamilyExamResults(UUID memberId);
}
