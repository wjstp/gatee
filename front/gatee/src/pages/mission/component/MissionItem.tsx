import React from "react";
import FileIcon from "@assets/image/icon3D/file.png"
import CameraIcon from "@assets/image/icon3D/camera.png"
import TargetIcon from "@assets/image/icon3D/target.png"
import CalendarIcon from "@assets/image/icon3D/calendar.png"
import GoodIcon from "@assets/image/icon3D/good.png"
import PencilIcon from "@assets/image/icon3D/pencil.png"
import {Link} from "react-router-dom";
import {FaCheckCircle} from "react-icons/fa";

import ProgressBar from "@ramonak/react-progress-bar";

type Mission = {
  content: string;
  range: number;
  complete: boolean;
  type: string
};
const MissionItem = ({mission}: { mission: Mission }) => {
  const iconImg = () => {
    let icon;
    let destination;

    switch (mission.type) {
      case "file":
        icon = <img className="iconimg" src={FileIcon} alt=""/>;
        destination = "/photo";
        break;
      case "camera":
        icon = <img className="iconimg" src={CameraIcon} alt=""/>;
        destination = "/photo";
        break;
      case "target":
        icon = <img className="iconimg" src={TargetIcon} alt=""/>;
        destination = "/profile";
        break;
      case "calendar":
        icon = <img className="iconimg" src={CalendarIcon} alt=""/>;
        destination = "calender";
        break;
      case "good":
        icon = <img className="iconimg" src={GoodIcon} alt=""/>;
        destination = "/photo";
        break;
      case "pencil":
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
  return (
    <div>
      <div className="mission__item">
        {icon}
        {!mission.complete ?
          <div className="mission-content">
            {/* 미션명 + 미션 하러가기 버튼 */}
            <div className="mission__name-container">
              <div className="title">{mission.content}
              </div>
              <Link to={destination} className="mission-goto">하러 가기</Link>
            </div>

            {/* 진행 바 */}
            {/*공식 문서 https://www.npmjs.com/package/@ramonak/react-progress-bar*/}
            <ProgressBar completed={mission.range * 100}
                         height={"13px"}
                         maxCompleted={100}
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
                <div className="title">{mission.content}
                </div>
                <FaCheckCircle color="#FFBE5C" size={18} className="check-icon"/>
              </div>
              {/*미션 완료 버튼*/}
              <button className="mission__complete-button">다음 미션</button>
            </div>

          </div>
        }

      </div>

    </div>
  );
}

export default MissionItem;