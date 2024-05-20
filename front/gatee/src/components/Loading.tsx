import React from 'react';
import {ReactComponent as LineLogo} from "@assets/images/logo/logo_line.svg"
import LoadingAnimation from "@assets/images/animation/loading_animation.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="loading-container">
      <LineLogo className="loading-app-icon" width={120} height={120} />
      <Lottie className="loading-animation" animationData={LoadingAnimation}/>
    </div>
  );
}

export default Loading;