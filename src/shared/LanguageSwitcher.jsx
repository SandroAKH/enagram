import React, { useState, useEffect } from "react";
import "./LanguageSwitcher.scss";
import { Dropdown } from "react-bootstrap";
import Ge from "../assets/ge.png";
import En from "../assets/en.png";
import Arrow from "../assets/arrow.png";
export default function LanguageSwitcher() {
  const [languagesData, setLanguagesData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [show, setShow] = useState(false);

  const showDropdown = () => {
    setShow(true);
  };

  const hideDropdown = () => {
    setShow(false);
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "ge":
        return (
          <div className="ge lanLogo">
            <img src={Ge} alt="Georgian" /> Georgian
          </div>
        );
      case "en":
        return (
          <div className="en lanLogo">
            <img src={En} alt="English" /> English
          </div>
        );

      default:
        return null;
    }
  };

  const languageChanger = (
    <div className="language-wrapper burger-link text-light-gray">
      <Dropdown
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <Dropdown.Toggle className="main-style" id="dropdown-basic">
          {renderSwitch(selectedLanguage)} <img src={Arrow} alt="Georgian" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.values(languagesData)
            .filter((language) => language.id !== selectedLanguage)
            .map((language) => (
              <Dropdown.Item
                key={language.id}
                onClick={() => handleItemSelect(language.id)}
              >
                {renderSwitch(language.id)}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  useEffect(() => {
    setLanguagesData({
      en: { id: "en", name: "English" },
      ge: { id: "ge", name: "Georgian" },
    });
  }, []);

  const handleItemSelect = (languageId) => {
    setSelectedLanguage(languageId);
    setShow(false);
  };

  return <>{languageChanger}</>;
}
