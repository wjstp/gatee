package io.ssafy.gatee.domain.exam.dao;

import io.ssafy.gatee.domain.exam.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    @Query("""
        select e from Exam e
        join MemberFamilyExam mf
        on mf.exam.id = e.id
        where mf.memberFamily.member.id = :memberId
    """)
    List<Exam> findByMemberId(UUID memberId);
}
