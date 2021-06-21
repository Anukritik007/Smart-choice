import React from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";
import { APP_NAME } from "../../Constants";

const Header = () => {
  const history = useHistory();

  return (
    <header className="header-container d-flex justify-content-center">
      <div
        role="button"
        tabIndex={0}
        className="brand-name font-em-15 align-self-center"
        onClick={() => history.push("/home")}
        onKeyPress={() => history.push("/home")}
      >
        {APP_NAME}
      </div>
    </header>
  );
};

export default Header;
