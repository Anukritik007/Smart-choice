import React from "react";
import "./Button.css";
const Button = ({
  name,
  type,
  role,
  bgColor,
  fontColor,
  isDisabled,
  onClick,
}) => {
  const renderButton = (name, type, bgColor, fontColor) => {
    switch (type) {
      case "circular":
        return (
          <button
            className="circular-button"
            onClick={onClick}
            disabled={isDisabled}
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
            disabled={isDisabled}
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
          <button
            className="btn btn-primary"
            type="button"
            disabled={isDisabled}
            onClick={onClick}
          >
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
