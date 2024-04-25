import React, {useState} from 'react';
import Header from "./component/Header";
import QuestionItem from "./component/QuestionItem";

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
  return (
    <div className="exam__scored">
      <Header/>
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
export default ExamScored;