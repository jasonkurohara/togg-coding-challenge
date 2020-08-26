import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import "./TopBar.css";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar
        className="togg-topbar-appBar"
        position="absolute"
        style={{ backgroundColor: "#2980B9" }}
      >
        <Toolbar className="tool-bar">
          <Typography variant="h5" color="inherit">
            NBA Player Dashboard
          </Typography>
          <img
            style={{ float: "left" }}
            src={require("../../images/NBA.png")}
          ></img>
          <Link to={"/tableview"} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="white"
              size="small"
              style={{
                font: "Montserrat",
                height: 30,
                marginLeft: 30,
                color: "white",
                border: "white",
                float: "right",
              }}
            >
              <ListItem>
                <ListItemText primary={"Table View"} />
              </ListItem>
            </Button>
          </Link>
          <Link to={"/boardview"} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="white"
              size="small"
              style={{
                height: 30,
                marginLeft: 30,
                color: "white",
                border: "white",
                float: "right",
              }}
            >
              <ListItem>
                <ListItemText primary={"Board View"} />
              </ListItem>
            </Button>
          </Link>

          <Typography variant="h5" color="inherit"></Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
