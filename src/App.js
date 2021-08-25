import "./App.css";
import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/home";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderDetail from "./pages/OrderDetail";
import Dashboard from "./pages/admin/Dashboard";
import SearchProduct from "./pages/SearchProduct";
import NotFound from "./pages/exception/NotFound";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ProductDetail from "./pages/products/ProductDetail";
import ProductsByCategogy from "./pages/products/ProductsByCategogy";

import AppBar from "./components/AppBar";

import { useSetRecoilState } from "recoil";
import { userSeletor } from "./recoil/userState";

import { auth } from "./utils/auth";
import { validateToken } from "./api/authAPI";

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
          <Route path="/search">
            <AppBar />
            <SearchProduct />
          </Route>
          <Route path="/cart">
            <AppBar />
            <Cart />
          </Route>
          <Route path="/checkout" exact>
            <AppBar />
            <Checkout />
          </Route>
          <Route path="/checkout/success">
            <AppBar />
            <CheckoutSuccess />
          </Route>
          <Route path="/categories/:slug">
            <AppBar />
            <ProductsByCategogy />
          </Route>
          <Route path="/products/:slug">
            <AppBar />
            <ProductDetail />
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
          <Route path="/profile">
            <AppBar />
            <Profile />
          </Route>
          <Route path="/chi-tiet-don-hang/:saleOrderId">
            <AppBar />
            <OrderDetail />
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
