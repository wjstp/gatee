import React from "react";
import TopBar from '../components/TopBar';
import BottomBar from "../components/BottomBar";
import { Outlet } from 'react-router-dom'
import {Helmet} from "react-helmet";

const MainLayout = () => {
  return (
    <>
      <Helmet>
        <meta name="theme-color" id="theme-color" content="#ffffff"/>
      </Helmet>
      <TopBar></TopBar>
      <div id="mainContainer">
        <Outlet />
      </div>
      <BottomBar></BottomBar>
    </>
  )
}

export default MainLayout