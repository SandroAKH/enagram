import React from "react";
import "./header.scss";
import Img from "../../assets/chrome.png";
import Profile from "../../assets/profile.png";
import Arrow from "../../assets/arrow.png";

const header = () => {
  return (
    <div className="header">
      <button className="header-btn chrome">
        <img src={Img} alt="chrome" /> Add to Chrome
      </button>
      <button className="header-btn pro">Upgrade to Pro </button>
      <div className="header-profile">
        <img src={Profile} alt="profile" />
        <img src={Arrow} alt="arrow" />
      </div>
    </div>
  );
};

export default header;
