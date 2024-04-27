import React from 'react';
import { Link } from "react-router-dom";

function MainIndex() {
  return (
    <div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        margin: "1rem"
      }}>
        <Link to="/signup">회원가입</Link>
        <Link to="/mission">미션</Link>
        <Link to="/character">백과사전</Link>
      </div>
    </div>
  );
}

export default MainIndex;