import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { useSetRecoilState } from "recoil";

import { userSeletor } from "../recoil/userState";
import { signup } from "../api/authAPI";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const classes = useStyles();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });

  const [openAlert, setOpenAlert] = useState(false);
  const setUserState = useSetRecoilState(userSeletor);
  const [showPassword, setShowPassword] = useState(false);
  const [userRes, setUserRes] = useState({
    typeAlert: "error",
    message: "",
  });

  const onValueChange = (event) => {
    const field = event.target.name;
    setUser({ ...user, [field]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const history = useHistory();

  const onSubmit = (event) => {
    signup(user)
      .then((data) => {
        setUserState({
          userId: data.userId,
          username: data.username,
          token: data.token,
          role: data.role,
        });
        sessionStorage.setItem("token", data.token);
        history.push("/");
      })
      .catch((err) => {
        setOpenAlert(true);
        setUserRes({ typeAlert: "error", message: err.message });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={user.firstName}
                onChange={onValueChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={onValueChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={user.username}
                onChange={onValueChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={user.password}
                onChange={onValueChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={user.email}
                onChange={onValueChange}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={onValueChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                value={user.address}
                onChange={onValueChange}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Đăng ký
          </Button>
          <Snackbar
            open={openAlert}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={userRes.typeAlert}>
              {userRes.message}
            </Alert>
          </Snackbar>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}
