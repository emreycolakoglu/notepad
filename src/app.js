import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter, Route } from "react-router-dom";
import HomeView from "./views/homeView";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flex: 1,
    height: "100%"
  }
}));

export default function App() {
  const classes = useStyles();
  //TODO React lazy
  return (
    <HashRouter>
      <div className={classes.root}>
        <Route exact={true} path="/" component={HomeView} />
      </div>
    </HashRouter>
  );
}
