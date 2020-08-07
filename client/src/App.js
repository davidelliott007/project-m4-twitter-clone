import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Notifications from "./Notifications";
import Tweet from "./Tweet";
import Profile from "./Profile";
import GlobalStyles from "./GlobalStyles.js";
import { IconName } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";

function App() {
  let currentUserContext = React.useContext(CurrentUserContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/tweet/:tweetid">
          <Tweet />
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
