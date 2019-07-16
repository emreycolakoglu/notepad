import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import dummy from "./services/views/dummy";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Route exact={true} path="/" component={dummy} />
        </div>
      </HashRouter>
    );
  }
}
export default App;