import React, {useEffect, useState} from 'react';
import {MemberApiRes} from "@type/index";
import {Link, useNavigate} from "react-router-dom";
import getGradeSvg from "@utils/getGradeSvg";
import {useFamilyStore} from "@store/useFamilyStore";
import Grade from "@pages/exam/Grade";
import Stamp from "@assets/images/icons/stamp_logo.png";
import {getAllFamilyExamResultApi} from "@api/exam";
import ExamNotFound from "@pages/exam/components/ExamNotFound";

interface FamilyGrade {
  nickname: string,
  memberId: string,
  averageScore: number | null
}

const ExamFamilyList = () => {

  const {familyName} = useFamilyStore()
  const [familyGrade, setFamilyGrade] = useState<FamilyGrade[]>([
    // {
    //   nickname:"예빈",
    //   memberId:"ad257b72-990e-4867-a616-9381dd144937",
    //   averageScore:null
    // },
    // {
    //   nickname:"윤정",
    //   memberId:"be5b567a-3310-4945-98cc-e84260ab02fe",
    //   averageScore:70
    // },
    // {
    //   nickname:"세진",
    //   memberId:"692445b0-17fe-4968-a886-fce6b72d4603",
    //   averageScore:70
    // },

  ]);

  useEffect(() => {
    getAllFamilyExamResultApi(res => {
      setFamilyGrade(res.data)
    }, err => {
      console.log(err)
    })
  }, []);
  return (
    <div className="exam-grade">

      {
        setFamilyGrade.length === 0 ?
          <ExamNotFound/>
          :
          <>
            <div className="exam__grade-header">
              <div className="small">{familyName}의 성적표</div>
            </div>
            <div className="exam__grade-body">

              {/*표 제목 - 인덱스*/}
              <div className="exam-grade-data">
                <div className="flex-date bgGray">이름</div>
                <div className="flex-point bgGray">평균 점수</div>
                <div className="flex-comment bgGray">등급</div>
              </div>

              {/*표 내용 */}
              {familyGrade.map((familyData, index) => {
                return <Table key={index} familyData={familyData}/>;
              })}
            </div>

            <div className="exam__grade-footer">
              <p>가족 퀴즈 모의고사 평가원장</p>
              <img src={Stamp} alt=""/>
            </div>

          </>

      }

    </div>
  );
};


const Table = ({familyData}: { familyData: FamilyGrade }) => {
  const grade = getGradeSvg(familyData.averageScore)
  return (
    <Link to={`/exam/grade/${familyData.memberId}`} className="exam-grade-data">
      <div className="flex-date">{familyData.nickname}</div>
      <div className="flex-point">
        {familyData.averageScore === null ?
          "없음"
          :
          `${Math.ceil(familyData.averageScore)}/100`
        }
      </div>
      <div className="flex-comment">{grade}</div>
    </Link>
  )
}
export default ExamFamilyList;