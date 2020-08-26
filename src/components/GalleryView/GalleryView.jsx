import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./GalleryView.css";

class GalleryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <Typography>Gallery view data</Typography>
      </div>
    );
  }
}

export default GalleryView;
