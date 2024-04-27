import React from "react";
import TopBar from '@components/TopBar';
import BottomBar from "@components/BottomBar";
import { Outlet } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MainLayout = () => {
  return (
    <>
        <HelmetProvider>
          <Helmet>
            <meta name="theme-color" id="theme-color" content="#ffffff"/>
          </Helmet>
        </HelmetProvider>
      <TopBar></TopBar>
      <div id="main-container">
        <Outlet />
      </div>
      <BottomBar></BottomBar>
    </>
  )
}

export default MainLayout