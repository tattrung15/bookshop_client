import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";

import { Container, Grid, Paper } from "@material-ui/core";

import Orders from "./Orders";
import NotFound from "../exception/NotFound";

import AppBarDrawer from "./AppBarDrawer";
import CategoriesManagement from "./CategoriesManagement";
import ProductManagement from "./ProductManagement";
import ProductImageManagement from "./ProductImageManagement";
import SaleOrderManagement from "./SaleOrderManagement";
import ListUserComponent from "../../components/ListUsers/ListUserComponent";

import { userSeletor } from "../../recoil/userState";
import { auth } from "../../utils/auth";
import { validateToken } from "../../api/authAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

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
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <AppBarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route path="/admin" exact>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Route>
          <Route path="/admin/users" exact>
            <Container maxWidth="xl" className={classes.container}>
              <ListUserComponent />
            </Container>
          </Route>
          <Route path="/admin/categories" exact>
            <Container maxWidth="xl" className={classes.container}>
              <CategoriesManagement />
            </Container>
          </Route>
          <Route path="/admin/products" exact>
            <Container maxWidth="xl" className={classes.container}>
              <ProductManagement />
            </Container>
          </Route>
          <Route path="/admin/product-images" exact>
            <Container maxWidth="xl" className={classes.container}>
              <ProductImageManagement />
            </Container>
          </Route>
          <Route path="/admin/sale-orders" exact>
            <Container maxWidth="xl" className={classes.container}>
              <SaleOrderManagement />
            </Container>
          </Route>
          <Redirect from="/**/profile" to="/profile" />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
