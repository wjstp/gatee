import React, {useEffect, useState} from 'react';
import Header from "@pages/exam/components/Header";
import {useNavigate} from "react-router-dom";
import QuestionItemTaking from "@pages/exam/components/QuestionItemTaking";
import ExamLoading from "@pages/exam/components/ExamLoading";
import {TransformedQuestionData} from "@type/index";
import {saveExamResultApi} from "@api/exam";
import {getNewExamApi} from "@api/exam";
import {transformQuestionData, getExamScore, setAnswerAtIndex, unSelectedIndex} from "@utils/examHelpers"
import {questionList} from "@constants/index";
import ExamNotFound from "@pages/exam/components/ExamNotFound";
import {doMissionApi} from "@api/mission";
import {IoWarningSharp} from "react-icons/io5";

const ExamTaking = () => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [myAnswerList, setMyAnswerList] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [startLoading, setStartLoading] = useState<boolean>(true);
  const [endLoading, setEndLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [noSelectList, setNoSelectList] = useState<number[]>([]);
  // 정답
  const [correctAnswerSheet, setCorrectAnswerSheet] = useState<number[]>([]);
  // 변환 객체
  const [transformedData, setTransformedData] = useState<TransformedQuestionData[]>([
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // },
    // {
    //   nickname: "SiAsda",
    //   question: "ASDDDDDDDD",
    //   answerList: ["ASASD asd aas aadasDDDDD DDDDDDDDDDDAS", "ASDASD", "ASDASD", "ASADD ASASDDDDDD"],
    //   correctNumber: 1,
    //   choiceNumber: 1
    // }
  ])

  // 시험지 제출 함수
  const submitExam = () => {
    // 끝나는 로딩넣기
    console.log("제출")
    setEndLoading(true)
    // 정답 데이터를 추가함
    const updatedTransformedData = transformedData.map((item, index) => {
      return {
        ...item,
        choiceNumber: myAnswerList[index],
        question: `${item.nickname} ${item.question}`
      };
    });
    setTransformedData(updatedTransformedData);
  }

  // 인덱스 넘겨주는 함수, 마지막 문제에서는 채점 화면으로 이동시켜준다

  const chooseValue: (questionNumber: number, value: number) => void = (questionNumber: number, value: number) => {
    // 답안 저장
    const updatedAnswerList = setAnswerAtIndex(questionNumber, value, myAnswerList);
    setMyAnswerList(updatedAnswerList); // 업데이트된 배열로 상태 업데이트

  }
  const handleNextIndex: (questionNumber: number, value: number) => void = (questionNumber: number, value: number) => {
    // 답안 저장
    const updatedAnswerList = setAnswerAtIndex(questionNumber, value, myAnswerList);
    setMyAnswerList(updatedAnswerList); // 업데이트된 배열로 상태 업데이트

    if (questionIndex < 9) {
      // 9보다 적을때는 answerlist 업데이트
      setQuestionIndex(questionIndex + 1);
    } else {
      // 마지막 문제일때는 저장 후 제출

      // 싹 다 답변 했을때는 바로 제출
      if (unSelectedIndex(updatedAnswerList).length === 0) {
        submitExam()
      } // 아닐때는 저장 안된 리스트 업데이트
      else {
        setNoSelectList(unSelectedIndex(updatedAnswerList))
        setWarning(true)
      }
    }
  }

  // 경고 모달 => 끝내기이면 시험제출, 아니면 모달 내리고, 안 푼문제로 돌려주기
  const handleWarningModal = (type: string) => {
    if (type === "finish") {
      submitExam()
    } else {
      setWarning(false)
      setQuestionIndex(noSelectList[0] - 1)
    }
  }


  // 이전 문제로 되돌려 준다
  const handleBeforeIndex: (questionNumber: number, value: number) => void = (questionNumber: number, value: number) => {
    if (questionIndex > 0) {
      const updatedAnswerList = setAnswerAtIndex(questionNumber, value, myAnswerList);
      setMyAnswerList(updatedAnswerList);
      setQuestionIndex(questionIndex - 1);
    }
  }

  // 정답 시트 눌러서 이동할 때
  const handleProblem = (index: number) => {
    setQuestionIndex(index)
  }


  // 미션 수행 api
  const doMissionApiFunc = () => {
    doMissionApi({type: "EXAM", photoCount: null},
      res => {
        console.log(res.data)

      }, err => {
        console.log(err)
      })
  }

  // 시험 저장 api
  const saveExamResultApiFunc = () => {
    // 제출하기
    doMissionApiFunc()
    saveExamResultApi({
      examResults: transformedData,
      score: getExamScore(myAnswerList, correctAnswerSheet)
    }, res => {
      console.log(res)
      // 미션 수행 api
      setTimeout(() => {
          setEndLoading(false)
          navigate(`/exam/${res.data.examId}`)
        }
        , 1000)

    }, err => {
      console.log(err)

      setTimeout(() => {
          setEndLoading(false)
          saveExamResultApiFunc()
          navigate("/exam/grade")
        }
        , 1000)
    })
  }

  // 로딩 끝내기
  useEffect(() => {
    if (startLoading && transformedData.length !== 0) {
      setTimeout(() =>
          setStartLoading(false)
        , 2000)
    } else if (endLoading === true) {
      saveExamResultApiFunc()
    }

  }, [transformedData]);

  // 시작하자마자 시험지 데이터 가져오기
  useEffect(() => {

    getNewExamApi(
      res => {
        console.log(res)
        const {transformedData, answerNumArray} = transformQuestionData(res.data)
        if (res.data.length > 9) {
          setTransformedData(transformedData)
          setCorrectAnswerSheet(answerNumArray)
        } else {
          setTimeout(() => {
              setStartLoading(false)
              setNotFound(true)
            }
            , 2000)

        }
      },
      err => {
        console.log(err)
        const {transformedData, answerNumArray} = transformQuestionData(questionList)
        setTransformedData(transformedData)
        setCorrectAnswerSheet(answerNumArray)
      }
    )

  }, []);

  return (
    <div className="exam-taking">
      {startLoading ?
        <ExamLoading type="start"/>
        :
        endLoading ?
          <ExamLoading type="end"/>
          :
          notFound ?
            <ExamNotFound/>
            :
            <>
              <Header/>
              <QuestionItemTaking myAnswerList={myAnswerList}
                                  handleNextIndex={handleNextIndex}
                                  chooseValue={chooseValue}
                                  handleBeforeIndex={handleBeforeIndex}
                                  questionNumber={questionIndex}
                                  questionItem={transformedData[questionIndex]}/>

              <MyAnswerSheet myAnswerList={myAnswerList} handleProblem={handleProblem}/>
            </>
      }
      {/* 정답 다 안했을 때 */}
      {warning ? <WarningModal noSelectList={noSelectList} handleWarningModal={handleWarningModal}/> : null}
    </div>
  );
};

const MyAnswerSheet = ({myAnswerList, handleProblem}: {
  myAnswerList: number[],
  handleProblem: (index: number) => void
}) => {
  return (
    <div className="exam-answer-sheet-container">

      {myAnswerList.map((answer, index) => {
        return (
          <div key={index} className={index === 9 ? "item-container" : "item-container item-right-line"}
               onClick={() => handleProblem(index)}>
            <p className="index">
              {index + 1}
            </p>
            {
              answer === 0 ?
                <div className="answer no-answer">
                  {answer}
                </div> :
                <span className="answer">
              {answer}
            </span>
            }


          </div>
        )
      })}


    </div>
  );
};

const WarningModal = ({noSelectList, handleWarningModal}: {
  noSelectList: number[],
  handleWarningModal: (type: string) => void
}) => {
  return (
    <div className="warning-modal-bg">
      <div className="warning-modal-content">
        <p>안 푼 문제가 있어요</p>
        <div>
          <IoWarningSharp size={100} color={"lightgray"}/>
          {/*{noSelectList.map((item, index) => <span key={index}>{item}{index===noSelectList.length-1 ? "":", "}</span>)}*/}
        </div>
        <div className="warning-modal-btn-container">
          <button className="keep-going-btn" onClick={() => handleWarningModal("finish")}>제출하기</button>
          <button className="replay-btn" onClick={() => handleWarningModal("not")}>다시 풀기</button>
        </div>
      </div>
    </div>
  )
}
export default ExamTaking;