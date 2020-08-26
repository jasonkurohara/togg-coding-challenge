import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Box,
  makeStyles,
} from "@material-ui/core";
import "./PlayerEntry.css";
// import BoardList from "./BoardList.jsx";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SportsBasketballSharpIcon from "@material-ui/icons/SportsBasketballSharp";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Icon from "@material-ui/core/Icon";
import SendIcon from "@material-ui/icons/Send";

class PlayerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.form = {
      player_name: "",
      age: 0,
      college: "",
      draft_year: 0,
      team_abbreviation: "",
    };
    this.state = { team_display: "" };
  }

  componentDidMount() {}

  sendForm(object) {
    console.log("sending");
    this.props.handleForm(object);
  }

  render() {
    var image;
    try {
      if (this.props.boardTeam === "") {
        image = require("../../images/" + this.state.team_display + ".png");
      } else {
        image = require("../../images/" + this.props.boardTeam + ".png");
      }
    } catch (error) {
      image = require("../../images/NBA.png");
    }
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="main-player-entry">
          <Grid container spacing={8}>
            <Grid container item xs={6} spacing={1}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                size="small"
                onChange={(event) => {
                  this.form.player_name = event.target.value;
                }}
              ></TextField>
            </Grid>
            <Grid container item xs={6} spacing={1}>
              <Typography>
                <h2 style={{ paddingBottom: 0 }}>
                  Selected Team: {this.props.boardTeam}
                </h2>
                <img
                  style={{ position: "absolute", paddingBottom: 50 }}
                  src={image}
                ></img>
              </Typography>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              {this.props.boardTeam === "" && (
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Team"
                  size="small"
                  onChange={(event) => {
                    this.setState({ team_display: event.target.value });
                    this.form.team_abbreviation = event.target.value;
                  }}
                ></TextField>
              )}
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Age"
                size="small"
                onChange={(event) => {
                  this.form.age = event.target.value;
                }}
              ></TextField>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="College"
                size="small"
                onChange={(event) => {
                  this.form.college = event.target.value;
                }}
              ></TextField>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Draft year"
                size="small"
                className="draft_field"
                onChange={(event) => {
                  this.form.draft_year = event.target.value;
                }}
              ></TextField>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.props.closeForm();
                }}
              >
                Close me
              </Button>
              <Button
                style={{ left: "80%" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.sendForm(this.form, this.props.fromTable);
                  this.props.closeForm();
                }}
              >
                Submit
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default PlayerEntry;
