/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const choices = useSelector((state) => state.choices);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (choices.every((_) => _.name)) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/home",
              state: {
                // eslint-disable-next-line react/prop-types
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
