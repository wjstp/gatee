import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import getGradeSvg from "@utils/getGradeSvg";
import {useFamilyStore} from "@store/useFamilyStore";
import Stamp from "@assets/images/icons/stamp_logo.png";
import {getAllFamilyExamResultApi} from "@api/exam";
import GradeNotFound from "@pages/exam/components/GradeNotFound";
import getUserInfo from "@utils/getUserInfo";

interface FamilyGrade {
  nickname: string,
  memberId: string,
  memberFamilyId: number;
  averageScore: number | null
}

const ExamFamilyList = () => {
  const [loading, setLoading] = useState(true);
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
      console.log(res)
      setLoading(false)
    }, err => {
      console.log(err)
    })
  }, []);
  return (
    <div className="exam-grade">

      {loading ?
        null :
        familyGrade.length === 0 ?
          <GradeNotFound/>
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
  const {familyInfo} = useFamilyStore()
  const userInfo = getUserInfo(familyInfo, familyData.memberId)
  const navigate = useNavigate()
  const gotoDetail = () => {
    if (userInfo)
      navigate(`/exam/grade/${userInfo.memberFamilyId}`)
  }
  return (
    <div onClick={() => gotoDetail()} className="exam-grade-data">
      <div className="flex-date">{familyData.nickname}</div>
      <div className="flex-point">
        {familyData.averageScore === null ?
          "없음"
          :
          `${Math.ceil(familyData.averageScore)}/100`
        }
      </div>
      <div className="flex-comment">{grade}</div>
    </div>
  )
}
export default ExamFamilyList;