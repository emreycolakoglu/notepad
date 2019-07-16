import React, { Component } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { HashRouter, Route } from "react-router-dom";
import dummy from "./views/dummy";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  }
}));

export default function App() {
  const classes = useStyles();
  //TODO React lazy
  return (
    <HashRouter>
      <div className={classes.root}>
        <Route exact={true} path="/" component={dummy} />
      </div>
    </HashRouter>
  );
}
