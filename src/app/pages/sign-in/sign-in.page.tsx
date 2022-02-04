import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import AuthService from "@app/services/http/auth.service";
import useObservable from "@core/hooks/use-observable.hook";
import StorageService from "@core/services/storage";
import { User } from "@app/models/user.model";
import { useDispatch } from "react-redux";
import { storeUser } from "@app/store/auth/auth.action";

export default function SignIn() {
  const classes = useStyles();

  const { subscribeOnce } = useObservable();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountState, setAccountState] = useState({
    username: "",
    password: "",
    isRemembered: false,
  });

  const handleLogin = () => {
    subscribeOnce(
      AuthService.login(accountState.username, accountState.password),
      (data) => {
        dispatch(storeUser(new User(data.result.data.user)));
        if (accountState.isRemembered) {
          StorageService.set("access_token", data.result.data.jwt);
        } else {
          StorageService.setSession("access_token", data.result.data.jwt);
        }
        navigate("/", { replace: true });
      }
    );
  };

  const handleInputChange = (event) => {
    setAccountState(
      Object.assign(accountState, { [event.target.name]: event.target.value })
    );
  };

  const handleRememberMe = () => {
    setAccountState({
      ...accountState,
      isRemembered: !accountState.isRemembered,
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                value="remember"
                className="bs-checkbox"
                onChange={handleRememberMe}
                checked={accountState.isRemembered}
              />
            }
            label="Ghi nhớ đăng nhập"
          />
          <br />
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
