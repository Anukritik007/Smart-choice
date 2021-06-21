// TODO: fix lint issues
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import "./WithOverlay.css";

const WithOverlay = (WrappedComponent) => {
  // eslint-disable-next-line react/prefer-stateless-function
  return class extends React.Component {
    render() {
      return (
        <div className="overlay position-absolute h-100 w-100">
          <div
            role="button"
            tabIndex={0}
            className="backdrop h-100 p-5"
            onClick={this.props.onBackdropClick}
            onKeyPress={this.props.onBackdropClick}
          >
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };
};

export default WithOverlay;
