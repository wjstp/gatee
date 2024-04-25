import React, {useState} from 'react';
import Header from "./component/Header";
import QuestionItem from "./component/QuestionItem";
import {ReactComponent as Scored100} from "../../assets/examImg/score100.svg"
import {ReactComponent as Scored90} from "../../assets/examImg/score90.svg"
import {ReactComponent as Scored80} from "../../assets/examImg/score80.svg"
import {ReactComponent as Scored70} from "../../assets/examImg/score70.svg"
import {ReactComponent as Scored60} from "../../assets/examImg/score60.svg"
import {ReactComponent as Scored50} from "../../assets/examImg/score50.svg"
import {ReactComponent as Scored40} from "../../assets/examImg/score40.svg"
import {ReactComponent as Scored30} from "../../assets/examImg/score30.svg"
import {ReactComponent as Scored20} from "../../assets/examImg/score20.svg"
import {ReactComponent as Scored10} from "../../assets/examImg/score10.svg"
import {ReactComponent as Scored0} from "../../assets/examImg/score0.svg"
function ExamScored() {
  const [questions, setQuestions] = useState([
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

  ])
  const [comments,setComments]=useState([

    {memberName:"예삐",comment:"웃기네"},
    {memberName:"엄마",comment:"이걸 틀리네"},
    {memberName:"언니",comment:"야.."},

  ])
  const score:number = 90
  return (
    <div className="exam__scored">
      <Header/>
      {/*<div className="exam__scored-mark">asdadsa</div>*/}
      <Mark/>
      {/*// 문제 컴포넌트 재사용성을 위해 이용되는 위치를 prop으로 내려줌*/}
      {questions.map((item, index) => {
        return (<QuestionItem key={index} question={questions[index]} type={"scored"}
                              myAnswerList={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
                              handleNextIndex={() => console.log()}
                              handleBeforeIndex={() => console.log()}
        />)
      })}

      <div className="exam__scored-footer">

      </div>

      {comments.map((comment:{memberName:string,comment:string},index:number)=>{
        return <ExamComment comment={comment} key={index}/>
      })}

    </div>
  );
}

const ExamComment: React.FC<{ comment: { memberName:string, comment:string} }> = ({comment})=>{
  return(
    <div className="exam__scored-comment">
    <img src="" alt="프사"/>
    <div className="comment">
      <p className="text-gray-100">{comment.memberName}</p>
      <p>{comment.comment}</p>
    </div>
  </div>)

}

const Mark=()=>{
  const [scoreState,setScoreState] = useState(90)
  return(<div className="exam__scored-mark">
    {/*왜*/}
    {scoreState==100 ?
      <Scored100/>
        : scoreState==90 ?
           <Scored90/>
            : scoreState==80 ?
                <Scored80/>
                : scoreState==70 ?
                    <Scored70/>
                    : scoreState==60 ?
                        <Scored60/>
                        : scoreState==50 ?
                            <Scored50/>
                            : scoreState==40 ?
                                <Scored40/>
                                : scoreState==30 ?
                                    <Scored30/>
                                    : scoreState==20 ?
                                        <Scored20/>
                                        : scoreState==10 ?
                                            <Scored10/>
                                            :<Scored0/>
    }
  </div>)

}
export default ExamScored;