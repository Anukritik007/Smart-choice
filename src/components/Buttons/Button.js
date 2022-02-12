import "./Button.scss";
import React from "react";
import PropTypes from "prop-types";

/* eslint-disable react/button-has-type */
const Button = ({ name, type, action, styles, isDisabled, onClick }) => {
  return (
    <button
      className={`${type || "rectangular"}-button`}
      onClick={onClick}
      disabled={isDisabled}
      type={action}
      style={styles}
    >
      {name}
    </button>
  );
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
