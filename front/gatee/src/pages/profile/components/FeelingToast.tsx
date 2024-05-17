import React from 'react';
import { useMemberStore } from "@store/useMemberStore";
import { modifyMoodApi } from "@api/profile";
import { AxiosError, AxiosResponse } from "axios";

interface HandleFinishTab {
  handleFinishTab: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const FeelingToast = ({handleFinishTab}:HandleFinishTab) => {
  const { myInfo, setMyInfo } = useMemberStore();

  // 완료 버튼 누르면 끝내기
  const handleFinish = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleFinishTab(event)
  }

  // 기분 설정한 것을 보내기
  const modifyMood = (newMood: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (newMood) {
      modifyMoodApi(
        {
          mood: newMood
        },
        (res: AxiosResponse<any>) => {
          console.log(res)
          // 기분 상태 수정
          setMyInfo({mood: newMood});
          handleFinish(event);
        },
        (err: AxiosError<any>) => {
          console.log(err)
        }
      ).then().catch();
    }
  }

  return (
    <div
      className="profile-feeling-toast"
      onClick={() => handleFinish}
    >

      {/*행복과 슬픔*/}
      <div className="feeling-toast__first">

        {/*행복*/}
        <button
          className={`first__part--01 ${myInfo.mood === "HAPPY" ? "active" : ""}`}
          onClick={(event) => {
            modifyMood("HAPPY", event);
          }}
        >
          <span className="part--01--emoji">🥰 </span>
          <span className="part--01--text">
            행복해요
          </span>
        </button>

        {/*슬픔*/}
        <button
          className={`first__part--02 ${myInfo.mood === "SAD" ? "active" : ""}`}
          onClick={(event) => {
            modifyMood("SAD", event);
          }}
        >
          <span className="part--02--emoji">😥 </span>
          <span className="part--02--text">
            속상해요
          </span>
        </button>

      </div>

      {/*분노와 외로움*/}
      <div className="feeling-toast__second">

        {/*분노*/}
        <button
          className={`second__part--01 ${myInfo.mood === "ANGRY" ? "active" : ""}`}
          onClick={(event) => {
            modifyMood("ANGRY", event);
          }}
        >
          <span className="part--01--emoji">🤬 </span>
          <span className="part--01--text">
            화나요
          </span>
        </button>

        {/*외로움*/}
        <button
          className={`second__part--02 ${myInfo.mood === "ALONE" ? "active" : ""}`}
          onClick={(event) => {
            modifyMood("ALONE", event);
          }}
        >
          <span className="part--02--emoji">😑 </span>
          <span className="part--02--text">
            혼자 있고 싶어요
          </span>
        </button>

      </div>

      {/*심란함과 피곤함*/}
      <div className="feeling-toast__third">

        {/*심란함*/}
        <button
          className={`third__part--01 ${myInfo.mood === "FEAR" ? "active" : ""}`}
          onClick={(event) => {
            modifyMood("FEAR", event);
          }}
        >
          <span className="part--01--emoji">😱 </span>
          <span className="part--01--text">
            심란해요
          </span>
        </button>

        {/*피곤함*/}
        <button
          className={`third__part--02 ${myInfo.mood === "SLEEPY" ? "active" : ""}`}
          onClick={(event) => {
            modifyMood("SLEEPY", event);
          }}
        >
          <span className="part--02--emoji">😪 </span>
          <span className="part--02--text">
            피곤해요
          </span>
        </button>

      </div>

    </div>
  );
};

export default FeelingToast;