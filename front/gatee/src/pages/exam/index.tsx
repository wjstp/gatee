import React from 'react';
import {Link} from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

import ExamAnimation from "@assets/images/animation/exam_animation.json"

import Lottie from "lottie-react";
function ExamIndex() {
  return (
    <div className="exam__index">
      {/*성적표로 이동*/}
      <div className="exam__index__heading">
        <Link to="/exam/grade" className="exam__index__heading-font">
          지난 평가 결과는?
        </Link>
      </div>
      {/*제목*/}
      <div className="exam__index__main-font">
        <p>가족에 대해</p>
        <p>얼마나 알고있는지</p>
        <h2>나를 테스트해보는 시간!</h2>
      </div>
      <div className="exam__index__img">
        <Lottie animationData={ExamAnimation} loop={true} />
      </div>
      <div className="exam__index-goToExam">
        <Link to="/exam/taking">
          <div className="exam__index-goToExam-button">
            <div>
              모의고사 보러가기
            </div>
            <MdArrowForwardIos style={{ marginRight:"-1rem"}}/>
          </div>

        </Link>
      </div>
      <p className="exam__index__hint">Hint! 가족의 백문백답, 얼마나 살펴보았나요?</p>
    </div>
  );
}

export default ExamIndex;