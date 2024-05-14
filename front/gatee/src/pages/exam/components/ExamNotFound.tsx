import React from 'react';
import {ReactComponent as EmptySvg} from "@assets/images/examImg/empty.svg";
import {useFamilyStore} from "@store/useFamilyStore";
import {Link} from "react-router-dom";
import {useMemberStore} from "@store/useMemberStore";

const ExamNotFound = () => {
    const {familyName} = useFamilyStore()
    const {myInfo} = useMemberStore()
    return (
        <div className="exam-not-found-container"
             // style={{height: '100%', backgroundColor: 'red', alignContent: 'center'}}
        >
            <EmptySvg className="exam__empty-icon"/>
            <div className="exam-not-found-info">
                <p>앗! {familyName}의</p>
                <h3>백과사전이 충분하지 않아요</h3>
            </div>
            <div className="exam-not-found-explain-container">
                <h3>이건 어때요?</h3>
                <p>가족과 함께 백과사전을 채워보아요</p>
                <Link className="go-to-dictionary-btn" to={`/character/start/${myInfo.memberFamilyId}`}>내 백과사전 질문 채우기</Link>
            </div>

        </div>
    );
};

export default ExamNotFound;