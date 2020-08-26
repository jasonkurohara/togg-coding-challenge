import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";
import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import UtilityBar from "./components/UtilityBar/UtilityBar";
import TableView from "./components/TableView/TableView";
import BoardView from "./components/BoardView/BoardView";
import GalleryView from "./components/GalleryView/GalleryView";
import * as data from "./modelData/all_seasons.json";
import shuffle from "./utilities.js";
import Modal from "react-modal";
import PlayerEntry from "./components/PlayerEntry/PlayerEntry.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    //States
    this.state = {
      active_players_data: null,
      player_count: 0,
      showModal: false,
      board_team: "",
    };

    //Vars
    this.all_players = data["default"];
    this.perma = null; //data that persists after filtering
    this.NUM_ENTRIES = 5;

    //Binds
    this.load_more_players = this.load_more_players.bind(this);
    this.shuffle = shuffle.bind(this);
    this.clear_display = this.clear_display.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //Call back function that takes in a JSON object as a parameter
  //and updates the displayed data.
  handleSubmission(form) {
    if (this.state.board_team !== "")
      form.team_abbreviation = this.state.board_team;

    this.all_players = this.all_players.concat([form]);
    var orig = this.perma;
    this.setState({
      active_players_data: this.state.active_players_data.concat([form]),
    });
    this.perma = orig.concat([form]);
  }

  //Call back functions to open and close modal for player input
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  add_new_player(team) {
    this.setState({ board_team: team });
    this.setState({ player_count: this.state.player_count + 1 });
    this.handleOpenModal();
  }

  //Clear all data
  clear_display() {
    this.NUM_ENTRIES = 0;
    this.setState({
      active_players_data: null,
      player_count: 0,
    });
    this.perma = null;
  }

  //Loads players into the display. If there are no players to display,
  //then we load in a batch of
  load_more_players() {
    var orig_players = this.state.active_players_data;
    if (this.NUM_ENTRIES === 0) {
      this.NUM_ENTRIES = 5;
      for (var i = 0; i < 5; i++) {
        var found = false;
        while (!found) {
          var new_player = [this.shuffle(this.all_players)[0]];
          if (orig_players != null) {
            orig_players.forEach(function (item) {
              if (item.id === new_player[0].id) {
                found = true;
              }
            });
          }
          if (!found) break;
          else found = false;
        }
        if (orig_players != null) {
          orig_players.push.apply(orig_players, new_player);
        } else {
          orig_players = new_player;
        }
      }
    } else {
      this.NUM_ENTRIES += 1;
      var found = false;
      while (!found) {
        var new_player = [this.shuffle(this.all_players)[0]];
        console.log(new_player[0].id);
        orig_players.forEach(function (item) {
          if (item.id === new_player[0].id) {
            found = true;
          }
        });
        if (!found) break;
        else found = false;
      }
      orig_players.push.apply(orig_players, new_player);
    }
    this.setState({
      active_players_data: orig_players,
      player_count: orig_players.length,
    });
    this.perma = orig_players;
  }

  //This function selects 5 random players
  componentDidMount() {
    this.all_players = shuffle(this.all_players);
    var starters = this.all_players.splice(0, this.NUM_ENTRIES);
    this.setState({
      active_players_data: starters,
      player_count: starters.length,
    });
    this.perma = starters;
  }

  filterPlayers(target) {
    var filtered = this.perma.filter(function (el) {
      if (el.player_name.toLowerCase().includes(target.toLowerCase())) {
        return el;
      }
    });
    this.setState({
      active_players_data: filtered,
      player_count: filtered.length,
    });
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TopBar />
              </Grid>
              <div className="cs142-main-topbar-buffer" />
              <Grid item xs={9} style={{ marginLeft: 25 }}>
                <Paper elevation={3}>
                  <UtilityBar
                    loadMore={this.load_more_players}
                    clearPlayers={this.clear_display}
                    filterData={this.filterPlayers.bind(this)}
                  />
                </Paper>
              </Grid>
              <Paper
                elevation={3}
                style={{
                  width: "100%",
                  width: "95%",
                  marginLeft: 50,
                  marginRight: 50,
                }}
              >
                <Modal
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                  className="Modal"
                  overlayClassName="Overlay"
                >
                  <button onClick={this.handleCloseModal.bind(this)}>X</button>
                  <PlayerEntry
                    handleForm={this.handleSubmission.bind(this)}
                    closeForm={this.handleCloseModal.bind(this)}
                    boardTeam={this.state.board_team}
                  />
                </Modal>

                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Typography variant="body1"></Typography>}
                  />
                  <Route
                    path="/tableview"
                    render={(props) => (
                      <TableView
                        players={this.state.active_players_data}
                        playerCount={this.state.player_count}
                        addPlayer={this.add_new_player.bind(this)}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/boardview"
                    render={(props) => (
                      <BoardView
                        players={this.state.active_players_data}
                        playerCount={this.state.player_count}
                        addPlayer={this.add_new_player.bind(this)}
                        {...props}
                      />
                    )}
                  />
                </Switch>
                {}
              </Paper>
            </Grid>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
