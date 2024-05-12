import React from 'react';
import WaitingLoading from "@assets/images/animation/waiting_animation.json"
import Lottie from "lottie-react";
const ExamLoading = ({type}:{type:string}) => {
  return (
    <div className="exam-loading-container">
      {type === "start"
        ?
        <h1>문제를 만들고 있어요!</h1>
        :
        <h1>채점중이에요!</h1>
      }
      <Lottie animationData={WaitingLoading}/>
    </div>
  );
};

export default ExamLoading;