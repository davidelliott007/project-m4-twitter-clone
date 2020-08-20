import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Notifications from "./Notifications";
import Meow from "./Meow";
import Profile from "./Profile";
import GlobalStyles from "./GlobalStyles.js";
import Bookmarks from "./Bookmarks";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/bookmarks">
          <Bookmarks />
        </Route>

        <Route path="/tweet/:tweetid">
          <Meow />
        </Route>
        <Route path="/:profileID">
          <Profile />
        </Route>
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
