import React from 'react';
import { useLocation } from "react-router-dom";

const SignupBottomBar = () => {
  const location = useLocation();

  return (
    <div
      className="signup-bottom-bar"
      style={{
        backgroundColor: location.pathname === '/signup' ? '#FFBE5C' : 'white',
        border: location.pathname === '/signup' ? '1px solid #FFBE5C' : 'none',
      }}
    >
    </div>

  )
}

export default SignupBottomBar;