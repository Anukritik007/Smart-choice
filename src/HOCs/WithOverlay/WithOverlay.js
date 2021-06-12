import React from "react";
import "./WithOverlay.css";

const WithOverlay = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div className="overlay position-absolute h-100 w-100">
          <div
            className="backdrop h-100 p-5"
            onClick={this.props.onBackdropClick}
          >
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };
};

export default WithOverlay;
