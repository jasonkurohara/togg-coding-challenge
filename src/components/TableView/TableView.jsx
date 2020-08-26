import React from "react";
import { Button } from "@material-ui/core";
import "./TableView.css";
import * as data from "../../modelData/all_seasons.json";

import shuffle from "../../utilities.js";
import AddIcon from "@material-ui/icons/Add";

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.NUM_ENTRIES = 5;
    this.state = {
      players: data,
      query: "",
      displayed_data: "",
      displayed: "",
      seen: false,
      player_count: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(target) {
    this.setState({ query: target });
    var filtered = this.state.displayed_data.filter(function (el) {
      if (el.player_name.toLowerCase().includes(target.toLowerCase())) {
        return el;
      }
    });
  }

  renderTableData(player_arr) {}

  renderTableData(player_arr) {
    if (player_arr === null) {
      return;
    }

    console.log("changing");
    return player_arr.map((player, index) => {
      const {
        id,
        player_name,
        team_abbreviation,
        age,
        college,
        draft_year,
      } = player;
      var image;
      try {
        image = require("../../images/" + team_abbreviation + ".png");
      } catch {
        image = require("../../images/NBA.png");
      }
      return (
        <tr key={id}>
          <td>{player_name}</td>
          <td>
            <img src={image}></img>
          </td>
          <td>{age}</td>
          <td>{college}</td>
          <td>{draft_year}</td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    var top_row = [];
    top_row[0] = <th key={0}>{"Name"}</th>;
    top_row[1] = <th key={1}>{"Team"}</th>;
    top_row[2] = <th key={2}>{"Age"}</th>;
    top_row[3] = <th key={3}>{"College"}</th>;
    top_row[4] = <th key={4}>{"Draft year"}</th>;
    return top_row;
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  clear_display() {
    this.NUM_ENTRIES = 0;
    this.setState({
      displayed_data: [],
      displayed: "",
      player_count: 0,
    });
  }

  render() {
    return (
      <div className="main">
        <div>
          <h1 id="title">Your Team</h1>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            style={{ marginLeft: 5 }}
            onClick={() => {
              this.props.addPlayer("");
            }}
          >
            Add
            <AddIcon fontSize="inherit" />
          </Button>
          <div
            style={{
              float: "right",
              marginTop: 40,
              marginRight: "10%",
            }}
          >
            <h1>Player Count: {this.props.playerCount}</h1>
          </div>
          <table
            id="players"
            style={{
              maxWidth: "80%",
              paddingBottom: 30,
            }}
          >
            <tbody>
              {this.renderTableHeader()}
              {this.renderTableData(this.props.players)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableView;
