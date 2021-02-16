import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";

import { Container, Grid, Paper } from "@material-ui/core";

import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

import AppBarDrawer from "./AppBarDrawer";
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

  const [userState, setUserState] = useRecoilState(userSeletor);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    const token = auth.getToken();
    if (!userState.username && token) {
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
  });

  return (
    <div className={classes.root}>
      <AppBarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route path="/admin" exact>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <Deposits />
                  </Paper>
                </Grid>
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
            <Container maxWidth="lg" className={classes.container}>
              <h1>Admin users</h1>
            </Container>
          </Route>
        </Switch>
      </main>
    </div>
  );
}
