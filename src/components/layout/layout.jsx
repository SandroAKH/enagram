import React from "react";
import Header from "../header/header";
import Content from "../content/content";
import Sidebar from "../sidebar/sidebar";
import "./layout.scss";
const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default Layout;
