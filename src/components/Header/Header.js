import "./Header.scss";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { BsList } from "react-icons/bs";
import themeContext from "../../themeContext";
import { APP_NAME } from "../../Constants";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

const Header = () => {
  const { isThemeDark, toggleTheme } = useContext(themeContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="header-container">
      <nav>
        <button
          className="menu-hamburger"
          type="button"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <BsList color="white" size={40} />
        </button>
        <div className="brand-name">
          <Link to="/home">{APP_NAME}</Link>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="toggle theme"
          className="theme-button"
        >
          {isThemeDark ? (
            <MdWbSunny color="white" size={20} />
          ) : (
            <FaRegMoon color="white" size={20} />
          )}
        </button>
      </nav>
      <MenuDrawer
        isOpen={isDrawerOpen}
        isThemeDark={isThemeDark}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        onOpen={() => setIsDrawerOpen(!isDrawerOpen)}
      />
    </header>
  );
};

export default Header;
