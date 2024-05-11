package io.ssafy.gatee.domain.member_family_exam.dao;

import io.ssafy.gatee.domain.member_family_exam.entity.MemberFamilyExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberFamilyExamRepository extends JpaRepository<MemberFamilyExam, Long> {
}
