import React from 'react';
import { useLocation } from "react-router-dom";

const SignupBottomBar = () => {
  const location = useLocation();

  return (
    <div
      className="bottom-bar"
      style={{
        height: "6svh",
        padding: 0,
        borderTop: location.pathname === '/signup' ? "1px solid #FFBE5C" : 'white',
        backgroundColor: location.pathname === '/signup' ? '#FFBE5C' : 'white'
      }}
    >
    </div>

  )
}

export default SignupBottomBar;