import React from "react";
import TopBar from '../components/TopBar';
import BottomBar from "../components/BottomBar";
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <TopBar></TopBar>
      <div id="mainContainer">
        <Outlet />
      </div>
      <BottomBar></BottomBar>
    </>
  )
}

export default MainLayout