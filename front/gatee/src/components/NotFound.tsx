import React from 'react';
import Lottie from "lottie-react";
import notFound from "@assets/images/animation/notfound_animation.json"
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
        <Lottie animationData={notFound} />
        <NavLink to="/main" className="not-found__button">
          Go Home
        </NavLink>
    </div>
  );
};

export default NotFound;