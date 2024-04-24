import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import FamilySetInfo from "./component/FamilySetInfo";
import FamilyJoin from "./component/FamilyJoin";
import FamilyShareCode from "./component/FamilyShareCode";

function SignupFamily() {
    const location = useLocation();
    const action = location.state?.action;
    const navigate = useNavigate();

    const familyShareButtonClick = (): void => {
        navigate('/signup/family', { state: { action: 'share' } });
    }

    return (
        <div>
            <div>
                {action === 'create' ? (
                    <FamilySetInfo />
                ) : action === 'join' ? (
                    <FamilyJoin />
                ) : action === 'share' ? (
                    <FamilyShareCode />
                ) : (
                    <div>
                        <span>어케옴?</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SignupFamily;