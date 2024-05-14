import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDictStore} from "@store/useDictStore";
import {sumbitAskAnswerApi} from "@api/dictionary";
import TextField from "@mui/material/TextField";
import {useMemberStore} from "@store/useMemberStore";
import {doMissionApi} from "@api/mission";

const CharacterQuestion = () => {
  const navigate = useNavigate();
  const {askList, askIndex, setAskIndex} = useDictStore()
  const [inputValue, setInputValue] = useState('');
  const {myInfo} = useMemberStore()
  const muiFocusCustom = {
    "& .MuiOutlinedInput-root": {
      fontSize: "1.2rem",
      marginTop: "1rem",
      borderRadius: "0.5rem",

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFBE5C",
          borderWidth: "2px",
        },
      }
    }
  };


  // 건너뛰기 버튼
  const skip = () => {
    console.log("다음 질문");
    if (askIndex < askList.length - 1) {
      setAskIndex(askIndex + 1)
    } else {
      navigate(`/character/start/${myInfo.memberFamilyId}`)
    }
  }

  // 제출 후 다음질문
  const submitHandler = () => {
    if (askIndex < askList.length - 1) {
      sumbitAskAnswerApiFunc()
    } else {
      sumbitAskAnswerApiFunc()
      setAskIndex(0)
    }
  }
  // 그만할래요
  const quitDictionary = () => {
    setAskIndex(0)
    navigate(`/character/start/${myInfo.memberFamilyId}`)
  }

  // 답변 제출
  const sumbitAskAnswerApiFunc = () => {
    sumbitAskAnswerApi(
      {
        featureId: askList[askIndex].featureId,
        answer: inputValue
      }, res => {
        console.log(res.data)
        console.log("제출");
        console.log("다음 질문");
        setAskIndex(askIndex + 1)
        setInputValue("")
        // 미션 수행
        doMissionApiFunc()
      }, err => {
        console.log(err)
      }
    )
  }

  // 미션 수행 api
  const doMissionApiFunc = () => {
    doMissionApi({type: "FEATURE", photoCount: null},
      res => {
        console.log(res.data)
        if (askIndex >= askList.length - 1) {
          navigate(`/character/start/${myInfo.memberFamilyId}`)
        }
      }, err => {
        console.log(err)
      })
  }
  return (
    <div className="character__question">

      {/*  그만두기 버튼 */}
      <div className="skipButton"
           onClick={() => quitDictionary()}
      >
        그만할래요
      </div>

      {/*  문제 명 */}
      <h1>{askList[askIndex].question}</h1>

      {/*  입력란 */}
      <TextField value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 type="text"
                 placeholder="답변을 입력해 주세요"
                 sx={muiFocusCustom}
                 autoFocus
                 multiline
                 onClick={(event) => event.stopPropagation()}/>
      {/*  다음 버튼 */}
      <button className="orangeButtonLarge" onClick={submitHandler}>
        {askIndex < askList.length - 1 ? "다음" : "제출"}
      </button>


      {/*  건너뛰기 버튼 */}
      {askIndex < askList.length - 1 ?
        <p className="skipButton flex-center"
           onClick={skip}>
          건너뛰기
        </p>
        :
        <p className="skipButton flex-center"
           onClick={skip}>
          끝내기
        </p>
      }


    </div>
  );
}

export default CharacterQuestion;