import React, { useContext } from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import themeContext from "../../themeContext";
import { APP_NAME } from "../../Constants";

const Header = () => {
  const history = useHistory();
  const { isThemeDark, toggleTheme } = useContext(themeContext);
  return (
    <header className="header-container d-flex justify-content-around">
      <div
        role="button"
        tabIndex={0}
        className="brand-name font-em-15 align-self-center"
        onClick={() => history.push("/home")}
        onKeyPress={() => history.push("/home")}
      >
        {APP_NAME}
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="border-0 bg-transparent px-2"
      >
        {isThemeDark ? (
          <FaRegMoon color="white" size={20} />
        ) : (
          <MdWbSunny color="white" size={20} />
        )}
      </button>
    </header>
  );
};

export default Header;
