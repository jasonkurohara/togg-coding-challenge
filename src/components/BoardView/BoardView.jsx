import React from "react";
import { Paper, Typography } from "@material-ui/core";
import "./BoardView.css";
import BoardList from "./BoardList.jsx";
import { DragDropContext } from "react-beautiful-dnd";
class BoardView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  groupBy(xs, key) {
    console.log("grouping by");
    console.log(xs);
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  renderCard(data) {
    return <div>{data}</div>;
  }

  renderBoard(players) {
    if (players === null) {
      return;
    }
    var groups = this.groupBy(this.props.players, "team_abbreviation");
    var lists = [];
    for (const team in groups) {
      lists.push(
        <BoardList
          key={team}
          title={team}
          cards={groups[team]}
          addPlayer={() => {
            this.props.addPlayer(team);
          }}
        />
      );
    }
    return lists;
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="main">
          <div className="scroll">{this.renderBoard(this.props.players)}</div>
        </div>
      </DragDropContext>
    );
  }
}

export default BoardView;
