import "./App.css";
import { React } from "react";
import { Switch, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import SignIn from "./pages/SignIn";
import User from "./pages/profile/User";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <AppBar />
        </Route>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/admin" exact>
          <User />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
