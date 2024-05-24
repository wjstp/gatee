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
              mf.member.nickname, mf.member.id, coalesce(avg(mfe.exam.score), null)
            )
            from MemberFamily mf
            left outer join MemberFamilyExam mfe
            on mfe.memberFamily.id = mf.id
            where mf.family = (select f.family from MemberFamily f where f.member.id = :memberId)
            group by mf.id
             """)
    List<ExamFamilyRes> findFamilyExamResults(UUID memberId);
}
