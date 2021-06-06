import React from "react";
import "./Button.css";
const Button = ({ name, type, role, bgColor, fontColor, onClick }) => {
  const renderButton = (name, type, bgColor, fontColor) => {
    switch (type) {
      case "circular":
        return (
          <button
            className="circular-button"
            onClick={onClick}
            type={role}
            style={{
              backgroundColor: bgColor,
              color: fontColor,
            }}
          >
            {name}
          </button>
        );

      case "rectangular":
        return (
          <button
            className="rectangular-button"
            onClick={onClick}
            type={role}
            style={{
              backgroundColor: bgColor,
              color: fontColor,
            }}
          >
            {name}
          </button>
        );

      default:
        return (
          <button type="button" className="btn btn-primary" onClick={onClick}>
            {name}
          </button>
        );
    }
  };
  return <>{renderButton(name, type, bgColor, fontColor, onClick)}</>;
};

export default Button;

Button.defaultProps = {
  role: "button",
};
