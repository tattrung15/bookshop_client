import "./App.css";
import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import User from "./pages/profile/User";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/exception/NotFound";
import HomePage from "./pages/home";

import { useSetRecoilState } from "recoil";
import { userSeletor } from "./recoil/userState";

import { auth } from "./utils/auth";
import { validateToken } from "./api/authAPI";
import ProductsByCategogy from "./pages/products/ProductsByCategogy";

function App() {
  const setUserState = useSetRecoilState(userSeletor);

  useEffect(() => {
    const token = auth.getToken();
    if (token) {
      validateToken(token)
        .then((data) => {
          setUserState({
            userId: data.userId,
            username: data.username,
            token: data.token,
            role: data.role,
          });
        })
        .catch((err) => {
          setUserState({
            userId: null,
            username: null,
            token: null,
            isAdmin: null,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <AppBar />
            <HomePage />
          </Route>
          <Route path="/categories/:slug">
            <AppBar />
            <ProductsByCategogy />
          </Route>
          <Route path="/login" exact>
            <AppBar />
            <SignIn />
          </Route>
          <Route path="/signup" exact>
            <AppBar />
            <SignUp />
          </Route>
          <Route path="/admin">
            <Dashboard />
          </Route>
          <Route path="/profile" exact>
            <AppBar />
            <User />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
