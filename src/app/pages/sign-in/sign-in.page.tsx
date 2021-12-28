import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import clsx from "clsx";

import { useStyles } from "./make-style";

export default function SignIn() {
  const classes = useStyles();

  const [account] = useState({
    username: "",
    password: "",
    loginError: "",
  });

  const handleLogin = async () => {};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
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
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                value="remember"
                className="bs-checkbox"
              />
            }
            label="Ghi nhớ đăng nhập"
          />
          <br />
          <span style={{ color: "red" }}>{account.loginError}</span>
          <Button
            id="btnSubmit"
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={clsx("bs-btn bs-btn-primary", classes.submit)}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" className="bs-text-primary">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" className="bs-text-primary">
                Bạn chưa có tài khoản? Đăng ký
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
