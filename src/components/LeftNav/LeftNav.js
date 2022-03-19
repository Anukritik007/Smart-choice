import "./LeftNav.scss";
import React, { useContext } from "react";
import { BsGear, BsClockHistory } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";
import themeContext from "../../themeContext";

const LeftNav = () => {
  const history = useHistory();
  const { isThemeDark } = useContext(themeContext);

  return (
    <section className="left-nav">
      <div className="list">
        <List>
          <ListItem
            button
            onClick={() => {
              history.push("/home");
            }}
          >
            <ListItemIcon>
              <AiOutlineHome color={isThemeDark ? "white" : "black"} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
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
      </div>
    </section>
  );
};

export default LeftNav;
