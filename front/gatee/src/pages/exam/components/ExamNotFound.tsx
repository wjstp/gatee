import React from 'react';
import {ReactComponent as EmptySvg} from "@assets/images/examImg/empty.svg";

const ExamNotFound = () => {
  return (
    <div className="exam__empty">
      <div className="large">성적표가 없어요</div>
      <EmptySvg className="exam__empty-icon"/>
    </div>
  );
};

export default ExamNotFound;