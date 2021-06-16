import React from "react";
import "./Button.css";

const Button = ({ name, type, role, styles, isDisabled, onClick }) => {
  const renderButton = (name, type, styles) => {
    switch (type) {
      case "circular":
        return (
          <button
            className="circular-button"
            onClick={onClick}
            disabled={isDisabled}
            type={role}
            style={styles}
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
            style={styles}
          >
            {name}
          </button>
        );

      default:
        return (
          <button
            className="default-button btn btn-primary"
            type="button"
            disabled={isDisabled}
            onClick={onClick}
          >
            {name}
          </button>
        );
    }
  };
  return <>{renderButton(name, type, styles, onClick)}</>;
};

export default Button;

Button.defaultProps = {
  role: "button",
};
