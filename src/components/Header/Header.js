import React from "react";
import "./Header.css";
import { APP_NAME } from "../../Constants";

const Header = () => {
  return (
    <header className="header-container d-flex justify-content-center">
      <h2 className="brand-name align-self-center">{APP_NAME}</h2>
    </header>
  );
};

export default Header;
