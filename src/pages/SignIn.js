import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useRecoilState } from "recoil";
import { auth } from "../utils/auth";
import { userSeletor } from "../recoil/userState";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [userState, setUserState] = useRecoilState(userSeletor);

  const [account, setAccount] = useState({
    username: "",
    password: "",
    loginError: "",
  });

  const history = useHistory();

  const handleLogin = async () => {
    const rememberMe = document.forms[0].rememberMe.checked;
    auth
      .login(account.username, account.password, rememberMe)
      .then((data) => {
        setUserState({
          userId: data.userId,
          username: data.username,
          token: data.token,
          role: data.role,
        });
        history.push("/");
      })
      .catch((err) => {
        setAccount({
          username: account.username,
          password: account.password,
          loginError: err.message,
        });
      });
  };

  const handleInputUsername = (event) => {
    setAccount(Object.assign(account, { username: event.target.value }));
  };

  const handleInputPassword = (event) => {
    setAccount(Object.assign(account, { password: event.target.value }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            onChange={handleInputUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputPassword}
          />
          <FormControlLabel
            control={
              <Checkbox name="rememberMe" value="remember" color="primary" />
            }
            label="Remember me"
          />
          <br />
          <span style={{ color: "red" }}>{account.loginError}</span>
          <Button
            id="btnSubmit"
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
