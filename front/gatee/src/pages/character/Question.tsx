import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDictStore} from "@store/useDictStore";
import {getNewDictAskApi, sumbitAskAnswerApi} from "@api/dictionary";
import TextField from "@mui/material/TextField";
import {useMemberStore} from "@store/useMemberStore";
import {doMissionApi} from "@api/mission";
import NewQuestionNotFound from "@pages/character/components/NewQuestionNotFound";
import Loading from "@components/Loading";

const CharacterQuestion = () => {
  const navigate = useNavigate();
  const {askList, askIndex, setAskIndex, setAskList} = useDictStore()
  const [isEmpty, setEmpty] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false)
  const {myInfo} = useMemberStore()
  const muiFocusCustom = {
    "& .MuiOutlinedInput-root": {
      fontSize: "1.2rem",
      marginTop: "1rem",
      marginBottom: "0",
      borderRadius: "0.5rem",

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFBE5C",
          borderWidth: "2px",
        },
      }
    }
  };
  const [isLoading, setIsLoading] = useState(true);

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
    if (inputValue.trim().length === 0) {
      setWarning(true)
      return
    }
    if (askIndex < askList.length - 1) {
      sumbitAskAnswerApiFunc(inputValue)
    } else {
      sumbitAskAnswerApiFunc(inputValue)
      setAskIndex(0)
    }
  }
  // 그만할래요
  const quitDictionary = () => {
    setAskIndex(0)
    navigate(`/character/start/${myInfo.memberFamilyId}`)
  }

  // 답변 제출
  const sumbitAskAnswerApiFunc = (input: string) => {
    setAskIndex(askIndex + 1)
    setInputValue("")
    // 미션 수행
    doMissionApiFunc()
    setWarning(false)
    sumbitAskAnswerApi(
      {
        featureId: askList[askIndex].featureId,
        answer: input
      }, res => {
        console.log("제출");
        console.log("다음 질문");

      }, err => {
        console.log(err)
        // 로딩
        setLoading(true)
        setTimeout(() => setLoading(false), 1000)
        // setAskIndex(askIndex - 1)
        // setInputValue(input)
      }
    )
  }

  // 미션 수행 api
  const doMissionApiFunc = () => {
    console.log("미션")
    doMissionApi({type: "FEATURE", photoCount: null},
      res => {
        console.log(res.data)
        // 마지막 질문일때
        if (askIndex >= askList.length - 1) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            navigate(`/character/start/${myInfo.memberFamilyId}`)
          }, 500)
        }
      }, err => {
        console.log(err)
      })
  }


  useEffect(() => {
    getNewDictAskApi(res => {
        console.log(res)
        setAskList(res.data)
        setIsLoading(false)
        if (res.data.length === 0) {
          setEmpty(true)
        }
      },
      err => {
        console.log(err)
      }
    )
  }, []);
  return (
    <div className="character__question">
      {isLoading ?
        null
        :
        isEmpty ?
          <>
            <NewQuestionNotFound/>

          </>
          :
          <>
            {/*  그만두기 버튼 */}
            <div className="skipButton"
                 onClick={() => quitDictionary()}
            >
              그만할래요
            </div>

            {/*  문제 명 */}
            <h2>{askList[askIndex]?.question}</h2>

            {/*  입력란 */}
            <TextField value={inputValue}
                       onChange={(e) => {
                         setInputValue(e.target.value)
                         if (e.target.value.length > 0) {
                           setWarning(false)
                         }
                       }}
                       type="text"
                       spellCheck={false}
                       placeholder="답변을 입력해 주세요"
                       sx={muiFocusCustom}
                       autoFocus
                       multiline
                       helperText={warning ? "빈칸은 제출할 수 없습니다" : " "}
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

          </>}
      {loading ? <Loading/> : null}
    </div>
  );
}

export default CharacterQuestion;