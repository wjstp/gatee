import React, {useEffect, useState} from 'react';
import Header from "@pages/exam/components/Header";
import {useNavigate} from "react-router-dom";
import QuestionItemTaking from "@pages/exam/components/QuestionItemTaking";
import ExamLoading from "@pages/exam/components/ExamLoading";
import {TransformedQuestionData} from "@type/index";
import {saveExamResultApi} from "@api/exam";
import {getNewExamApi} from "@api/exam";
import {transformQuestionData,getExamScore,setAnswerAtIndex} from "@utils/examHelpers"
import {questionList} from "@constants/index";


const ExamTaking = () => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [myAnswerList, setMyAnswerList] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [startLoading, setStartLoading] = useState<boolean>(true);
  const [endLoading, setEndLoading] = useState<boolean>(false);

  // 정답
  const [correctAnswerSheet, setCorrectAnswerSheet] = useState<number[]>([]);
  // 변환 객체
  const [transformedData, setTransformedData] = useState<TransformedQuestionData[]>([])

  // 인덱스를 넘겨주고, 마지막 문제에서는 채점 화면으로 이동시켜준다
  const handleNextIndex: (questionNumber: number, value: number) => void = (questionNumber: number, value: number) => {
    // 답안 저장
    if (value !== 0) {
      const updatedAnswerList = setAnswerAtIndex(questionNumber, value, myAnswerList);
      setMyAnswerList(updatedAnswerList); // 업데이트된 배열로 상태 업데이트
    }

    if (questionIndex < 9) {
      // 9보다 적을때는 answerlist 업데이트
      setQuestionIndex(questionIndex + 1);
    } else {
      // 마지막 문제일때는 저장 후 제출
      console.log("제출")
      // 끝나는 로딩넣기
      setEndLoading(true)
      // 정답 데이터를 추가함
      const updatedTransformedData = transformedData.map((item, index) => {
        return {
          ...item,
          choiceNumber: myAnswerList[index],
          question:`${item.nickname}님의 ${item.question}은?`
        };
      });
      console.log(updatedTransformedData)
      setTransformedData(updatedTransformedData);

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


  useEffect(() => {

    getNewExamApi(
      res => {
        console.log(res)
        const {transformedData, answerNumArray} = transformQuestionData(res.data)
        setTransformedData(transformedData)
        setCorrectAnswerSheet(answerNumArray)
      },
      err => {
        console.log(err)
        const {transformedData, answerNumArray} = transformQuestionData(questionList)
        setTransformedData(transformedData)
        setCorrectAnswerSheet(answerNumArray)
      }
    )

  }, []);


  // 로딩 끝내기
  useEffect(() => {
    if (startLoading && transformedData.length !== 0) {
      setTimeout(() =>
          setStartLoading(false)
        , 2000)
    } else if (endLoading === true) {

      saveExamResultApi({
        examResults: transformedData,
        score: getExamScore(myAnswerList, correctAnswerSheet)
      }, res => {
        console.log(res)

        setTimeout(() => {
            setEndLoading(false)
            navigate(`/exam/scored/${res.data.examId}`)
          }
          , 1000)

      }, err => {
        console.log(err)

        setTimeout(() => {
            setEndLoading(false)
            navigate("/exam/grade")
          }
          , 1000)
      })

    }
  }, [transformedData]);

  return (
    <div className="exam-taking">
      {startLoading ?
        <ExamLoading type="start"/>
        :
        endLoading ?
          <ExamLoading type="end"/>
          :
          <>
            <Header/>
            <QuestionItemTaking myAnswerList={myAnswerList}
                                handleNextIndex={handleNextIndex}
                                handleBeforeIndex={handleBeforeIndex}
                                questionNumber={questionIndex}
                                questionItem={transformedData[questionIndex]}/>

            <MyAnswerSheet myAnswerList={myAnswerList} handleProblem={handleProblem}/>
          </>
      }

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

export default ExamTaking;