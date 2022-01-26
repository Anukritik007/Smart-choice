import "./Overlay.scss";
import React from "react";
import PropTypes from "prop-types";

const Overlay = ({ onBackdropClick, children }) => {
  return (
    <div className="overlay">
      <div
        role="presentation"
        className="backdrop animate__animated animate__fadeIn"
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
