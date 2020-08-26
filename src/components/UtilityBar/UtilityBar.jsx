import React from "react";
import { TextField, Button } from "@material-ui/core";
import "./UtilityBar.css";

class UtilityBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main" style={{ marginTop: 50 }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => this.props.filterData(e.target.value)}
          style={{
            float: "left",
            height: 45,
            marginLeft: 20,
            marginTop: 8,
          }}
          size="small"
        ></TextField>

        <Button
          variant="contained"
          color="#ff5c5c"
          style={{ marginLeft: 50, marginBottom: 15 }}
          onClick={() => {
            this.props.loadMore();
          }}
        >
          Draft players
        </Button>

        <Button
          variant="contained"
          color="#ff5c5c"
          onClick={() => {
            this.props.clearPlayers();
          }}
          style={{ marginLeft: 50, marginBottom: 15 }}
        >
          Clear
        </Button>
      </div>
    );
  }
}

export default UtilityBar;
