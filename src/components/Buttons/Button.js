import "./Button.scss";
import React from "react";
import PropTypes from "prop-types";

/* eslint-disable react/button-has-type */
const Button = ({ name, type, action, styles, isDisabled, onClick }) => {
  const renderButton = (text, shape, css) => {
    switch (shape) {
      case "circular":
        return (
          <button
            className="circular-button"
            onClick={onClick}
            disabled={isDisabled}
            type={action}
            style={css}
          >
            {text}
          </button>
        );

      case "rectangular":
        return (
          <button
            className="rectangular-button"
            onClick={onClick}
            type={action}
            disabled={isDisabled}
            style={css}
          >
            {text}
          </button>
        );

      default:
        return (
          <button
            className="default-button btn btn-primary"
            type="button"
            disabled={isDisabled}
            onClick={onClick}
            style={css}
          >
            {text}
          </button>
        );
    }
  };
  return <>{renderButton(name, type, styles, onClick)}</>;
};

export default Button;

Button.defaultProps = {
  action: "button",
  type: "",
  styles: {},
  isDisabled: false,
  onClick: () => {},
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  action: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
