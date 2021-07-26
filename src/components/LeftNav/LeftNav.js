import "./LeftNav.scss";
import React, { useContext } from "react";
import { BsGear, BsClockHistory } from "react-icons/bs";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import themeContext from "../../themeContext";

const LeftNav = () => {
  const history = useHistory();
  const { isThemeDark } = useContext(themeContext);

  return (
    <section className="left-nav">
      <List>
        <ListItem
          button
          onClick={() => {
            history.push("/settings");
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
          }}
        >
          <ListItemIcon>
            <BsClockHistory color={isThemeDark ? "white" : "black"} />
          </ListItemIcon>
          <ListItemText primary="Choice history" />
        </ListItem>
      </List>
    </section>
  );
};

export default LeftNav;
