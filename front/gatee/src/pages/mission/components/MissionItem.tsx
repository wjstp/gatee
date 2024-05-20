import React from "react";
import CameraIcon from "@assets/images/icon3D/camera.png"
// import SmileIcon from "@assets/images/icon3D/smile.png"
import TargetIcon from "@assets/images/icon3D/target.png"
import CalendarIcon from "@assets/images/icon3D/calendar.png"
import PencilIcon from "@assets/images/icon3D/pencil.png"
import {Link} from "react-router-dom";
import {FaCheckCircle} from "react-icons/fa";

import ProgressBar from "@ramonak/react-progress-bar";
import getContentFromMission from "@utils/getContentFromMission";
import {completeMissionApi} from "@api/mission";
import {MissionListApiReq} from "@type/index";


const MissionItem = ({mission, handleSubmitMission}: { mission: MissionListApiReq, handleSubmitMission: () => void }) => {
  const iconImg = () => {
    let icon;
    let destination;

    switch (mission.type) {
      case "ALBUM":
        icon = <img className="iconimg" src={CameraIcon} alt=""/>;
        destination = "/photo";
        break;
      case "FEATURE":
        icon = <img className="iconimg" src={TargetIcon} alt=""/>;
        destination = "/character/question";
        break;
      case "SCHEDULE":
        icon = <img className="iconimg" src={CalendarIcon} alt=""/>;
        destination = "/schedule";
        break;
      case "EXAM":
        icon = <img className="iconimg" src={PencilIcon} alt=""/>;
        destination = "/exam";
        break;
      default:
        icon = null;
        destination = "";
        break;
    }

    return {icon, destination};
  };

  const {icon, destination} = iconImg();
  const content = getContentFromMission(mission.type, mission.completedLevel);

  // 미션 제출
  const submitMission = () => {
    completeMissionApi({type: mission.type}, res => {
      console.log(res)
      handleSubmitMission()
    }, err => {
      console.log(err)
    })
  }

  return (
    <div>
      <div className="mission__item">
        {icon}
        {!mission.isComplete ?
          <div className="mission-content">
            {/* 미션명 + 미션 하러가기 버튼 */}
            <div className="mission__name-container">
              <div className="title">{content}
              </div>
              <Link to={destination} className="mission-goto">하러 가기</Link>
            </div>

            {/* 진행 바 */}
            {/*공식 문서 https://www.npmjs.com/package/@ramonak/react-progress-bar*/}
            <ProgressBar completed={mission.nowRange}
                         height={"13px"}
                         maxCompleted={mission.maxRange}
                         bgColor={"#FFBE5C"}
                         baseBgColor={"#f6f6f6"}
                         isLabelVisible={false}
            />
          </div>
          :
          <div className="mission-content">
            <div className="mission__name-container">
              {/*미션 명*/}
              <div className="title-check-align">
                <div className="title">{content}
                </div>
                <FaCheckCircle color="#FFBE5C" size={18} className="check-icon"/>
              </div>
              {/*미션 완료 버튼*/}
              <button onClick={() => submitMission()} className="mission__complete-button">다음 미션</button>
            </div>

          </div>
        }

      </div>

    </div>
  );
}

export default MissionItem;