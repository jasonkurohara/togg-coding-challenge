import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./BoardList.css";
import BoardCard from "./BoardCard.jsx";

import { Droppable } from "react-beautiful-dnd";
import AddIcon from "@material-ui/icons/Add";

class BoardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }

  renderCards(cards) {
    if (cards === undefined) {
      return;
    }
    var display = [];
    var card_team = "";
    for (var i = 0; i < cards.length; i++) {
      card_team = cards[i].team_abbreviation;
      display.push(
        <BoardCard
          key={i}
          playerInfo={cards[i]}
          id={String(i) + String(this.props.title)}
        />
      );
    }
    console.log("current team for card:" + card_team);
    display.push(
      <Button
        size="small"
        color="primary"
        variant="outlined"
        style={{ marginLeft: 5 }}
        onClick={(card_team) => {
          this.props.addPlayer();
        }}
      >
        Add
        <AddIcon fontSize="inherit" />
      </Button>
    );
    return display;
  }

  componentDidMount() {}
  render() {
    console.log("board list droppable title: " + this.props.title);
    return (
      <Droppable droppableId={String(this.props.title)}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="board-list"
          >
            <Paper elevation={3}>
              <div className="board-list-header">
                <h6 style={{ height: 20, marginTop: 20 }}>
                  {this.props.title}
                  <img
                    src={require("../../images/" + this.props.title + ".png")}
                  ></img>
                </h6>
              </div>

              {this.renderCards(this.props.cards)}
              {provided.placeholder}
            </Paper>
          </div>
        )}
      </Droppable>
    );
  }
}

export default BoardList;
