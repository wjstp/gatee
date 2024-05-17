import React from 'react';
import { useLocation } from "react-router-dom";

const SignupBottomBar = () => {
  const location = useLocation();

  return (
    <div
      className="signup-bottom-bar"
      style={{
        backgroundColor: location.pathname === '/signup' ? '#FFBE5C' : 'white'
      }}
    >
    </div>

  )
}

export default SignupBottomBar;