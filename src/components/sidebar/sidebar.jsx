import React, { useState } from "react";
import "./sidebar.scss";
// import Voice from "../../assets/voice.svg";
import Settings from "../../assets/settings.png";
import Facebook from "../../assets/facebook.png";
import Contact from "../../assets/contact.png";
import Light from "../../assets/light.png";
import Dark from "../../assets/dark.png";

import { Voice, Check, Cam } from "../../assets/Icons";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => {
    if (index !== activeItem) {
      setActiveItem(index);
    }
  };

  const listItems = [
    { label: "Spellchecker", image: <Check /> },
    { label: "Text to speech", image: <Voice /> },
    { label: "Speech to text", image: <Cam /> },
  ];

  return (
    <div className="sidebar">
      <div className="">
        <ul>
          {listItems.map((item, index) => (
            <li
              key={index}
              className={activeItem === index ? "active" : ""}
              onClick={() => handleItemClick(index)}
            >
              {item.image}
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-settings">
        <hr />
        <ul>
          <li>
            <img src={Settings} alt="settings" />
            Settings
          </li>
          <li>
            {" "}
            <img src={Facebook} alt="facebook" />
            Facebook{" "}
          </li>
          <li>
            {" "}
            <img src={Contact} alt="contact" />
            Contact support
          </li>
        </ul>
        <hr />

        <div className="sidebar-icons">
          <img src={Light} alt="light" />
          <img src={Dark} alt="dark" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
