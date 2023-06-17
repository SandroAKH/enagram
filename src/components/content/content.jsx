import React from "react";

import "./content.scss";
import Check from "../../assets/checkBtn.png";
import Copy from "../../assets/copy.png";
import Delete from "../../assets/delete.png";
import Bold from "../../assets/formats/bold.png";
import Clear from "../../assets/formats/clear.png";
import Underline from "../../assets/formats/underline.png";
import Hone from "../../assets/formats/h1.png";
import Htwo from "../../assets/formats/h2.png";
import Italic from "../../assets/formats/italic.png";
import Link from "../../assets/formats/link.png";
import ListOrdered from "../../assets/formats/listOrdered.png";
import ListUnordered from "../../assets/formats/listUnordered.png";
import Logo from "../../assets/logo.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import LanguageSwitcher from "../../shared/LanguageSwitcher";

const content = () => {
  const formatItems = [
    { label: "Bold", image: Bold },
    { label: "Italic", image: Italic },
    { label: "Underline", image: Underline },
    { label: "List Unordered", image: ListUnordered },
    { label: "List Ordered", image: ListOrdered },
    { label: "H1", image: Hone },
    { label: "H2", image: Htwo },
    { label: "Link", image: Link },
    { label: "Clear", image: Clear },
  ];
  return (
    <div className="content">
      <div className="content-header">
        <div>
          <button className="check-btn">
            <img src={Check} alt="Check" /> Check
          </button>
        </div>
        <div className="action-btns">
          <button className="copy ">
            {" "}
            <img src={Copy} alt="Copy" />
            Copy
          </button>
          <button>
            {" "}
            <img src={Delete} alt="Delete" />
            Delete
          </button>
          <LanguageSwitcher />
        </div>
      </div>
      <div className="content-input">
        <textarea
          name=""
          id=""
          cols="30"
          rows="1"
          placeholder="Type or paste (⌘+V) something here."
        ></textarea>
      </div>

      <hr className="footer-border" />
      <div className="content-footer">
        <div className="formats">
          {formatItems.map((item, index) => (
            <OverlayTrigger
              key={index}
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${item.label}`}>
                  {item.label} <span>Ctrl+B</span>
                </Tooltip>
              }
            >
              <div>
                <img src={item.image} alt={item.label} />
              </div>
            </OverlayTrigger>
          ))}
        </div>
        <div className="logo">
          <div className="chars">628 characters, 103 words</div>

          <img src={Logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default content;
