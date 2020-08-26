import React from "react";
import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import "./BoardCard.css";
import { Draggable } from "react-beautiful-dnd";

class BoardCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageError = this.handleImageError.bind(this);
  }

  handleImageError(e) {
    e.target.src = require("../../images/PLAYER.png");
  }
  render() {
    var full_name = this.props.playerInfo.player_name.split(" ");
    var first_name = full_name[0];
    var last_name = full_name[1];

    console.log("draggable id: " + this.props.title);
    console.log("index: " + this.props.id);
    var drag_id =
      String(this.props.id) + String(this.props.playerInfo.player_name);
    console.log("id: " + drag_id);
    return (
      <Draggable
        draggableId={
          String(this.props.id) + String(this.props.playerInfo.first_name)
        }
        index={this.props.id}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="board-card">
              <Card>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={
                    "https://nba-players.herokuapp.com/players/" +
                    last_name +
                    "/" +
                    first_name
                  }
                  onerror="this.style.opacity='0'"
                  title="Contemplative Reptile"
                  onError={(e) => {
                    this.handleImageError(e);
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {this.props.playerInfo.player_name}
                  </Typography>
                  <Typography
                    style={{ display: "inline-block" }}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {"Age: " + this.props.playerInfo.age}
                    <br />
                    {"College: " + this.props.playerInfo.college}
                    <br />
                    {"Draft year: " + this.props.playerInfo.draft_year}
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default BoardCard;
