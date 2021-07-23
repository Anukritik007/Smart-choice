import "./Overlay.scss";
import React from "react";
import PropTypes from "prop-types";

const Overlay = ({ onBackdropClick, children }) => {
  return (
    <div className="overlay position-absolute h-100 w-100">
      <div
        role="presentation"
        className="backdrop animate__animated animate__fadeIn h-100 p-5"
        onClick={onBackdropClick}
        onKeyPress={onBackdropClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;

Overlay.propTypes = {
  onBackdropClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
