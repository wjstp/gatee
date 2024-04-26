import React from 'react';
import { Link } from "react-router-dom";
import NotificationBadge from "@components/NotificationBadge";

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
        <Link to="/main/mission">미션</Link>
      </div>
    </div>
  );
}

export default MainIndex;