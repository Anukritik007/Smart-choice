import "./MenuDrawer.scss";
import React from "react";
import PropTypes from "prop-types";
import { BsGear, BsClockHistory } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  listDark: {
    width: 300,
    background: "#213842",
    color: "white",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  listLight: {
    width: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

const MenuDrawer = ({ isOpen, onClose, onOpen, isThemeDark }) => {
  const classes = useStyles();
  const history = useHistory();
  const list = () => (
    <div
      role="presentation"
      className={isThemeDark ? classes.listDark : classes.listLight}
    >
      <div className="drawer-header">
        <div>
          <img src="#" alt="user" />
        </div>
        <span>Smart choice User</span>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            history.push("/settings");
            onClose();
          }}
        >
          <ListItemIcon>
            <BsGear color={isThemeDark ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push("/history");
            onClose();
          }}
        >
          <ListItemIcon>
            <BsClockHistory color={isThemeDark ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Choice history" />
        </ListItem>
      </List>
      <Divider />
      <p className="p-4">
        Made with &nbsp;
        <FaHeart color={isThemeDark ? "white" : "black"} /> &nbsp;by Anukritik
      </p>
    </div>
  );
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      disableSwipeToOpen
      onClose={onClose}
      onOpen={onOpen}
    >
      {list()}
    </SwipeableDrawer>
  );
};

export default MenuDrawer;

MenuDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isThemeDark: PropTypes.bool,
};

MenuDrawer.defaultProps = {
  isOpen: false,
  isThemeDark: false,
};
