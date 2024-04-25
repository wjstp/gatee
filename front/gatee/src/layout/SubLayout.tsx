import React from "react";
import { Outlet } from 'react-router-dom'

const SubLayout = () => {
  return (
    <>
      <div id="subContainer">
        <Outlet />
      </div>
    </>
  )
}

export default SubLayout