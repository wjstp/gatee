import React, {useEffect, useState} from 'react';
import Header from "@pages/exam/components/Header";
import QuestionItem from "@pages/exam/components/QuestionItem";
import {useNavigate} from "react-router-dom";
import {getNewExamApi} from "@api/exam";

const ExamTaking = () => {
  const navigate = useNavigate();
  const questions = [
    {
      questionId: 1,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
        // myanswer:,
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 2,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 3,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 4,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 5,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 6,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 7,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 8,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    }, {
      questionId: 9,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    }, {
      questionId: 10,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },

  ]
  const [questionIndex, setQuestionIndex] = useState(0);
  const [myAnswerList, setMyAnswerList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  // 인덱스를 넘겨주고, 마지막 문제에서는 채점 화면으로 이동시켜준다
  const handleNextIndex: (newAnswerList:number[]) => void = (newAnswerList:number[]) => {
    // 답안 저장
    setMyAnswerList(newAnswerList)
    if (questionIndex < 9) {
      // 9보다 적을때는 answerlist 업데이트
      setQuestionIndex(questionIndex + 1);
    } else {
      // 마지막 문제일때는 저장 후 제출
      console.log("제출")
      console.log(newAnswerList)
      navigate("/exam/grade")
    }
  }
  // 이전 문제로 되돌려 준다
  const handleBeforeIndex: () => void = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }


  useEffect(() => {
    getNewExamApi(
      res => console.log(res),
      err => console.log(err)
    )
  }, []);
  return (
    <div>
      <Header/>

      {/* 문제 컴포넌트
          재사용성을 위해 이용되는 위치를 prop으로 내려줌*/}
      <QuestionItem question={questions[questionIndex]} type={"taking"}
                    handleNextIndex={handleNextIndex}
                    myAnswerList={myAnswerList}
                    handleBeforeIndex={handleBeforeIndex}
      />
    </div>
  );
};


export default ExamTaking;