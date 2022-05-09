import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useStyles } from "./make-style";
import AuthService from "@app/services/http/auth.service";
import useObservable from "@core/hooks/use-observable.hook";
import StorageService from "@core/services/storage";
import { User } from "@app/models/user.model";
import { storeUser } from "@app/store/auth/auth.action";
import HttpService from "@core/services/http/http.service";
import PopupDialog from "@app/components/popup-dialog";
import Controls from "@app/components/controls";
import useEventListener from "@core/hooks/use-event-listener";

export default function SignIn() {
  const classes = useStyles();

  const { subscribeOnce } = useObservable();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<string>("");
  const [accountState, setAccountState] = useState({
    username: "",
    password: "",
    isRemembered: true,
  });

  useEffect(() => {
    const token = HttpService.getAccessToken() || "";

    subscribeOnce(AuthService.validate(token), (data) => {
      dispatch(storeUser(new User(data.result.data.user)));
      StorageService.set("access_token", data.result.data.jwt);
      StorageService.set("role", data.result.data.user.role);
      navigate("/", { replace: true });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    subscribeOnce(
      AuthService.login(accountState.username, accountState.password),
      (response) => {
        dispatch(storeUser(new User(response.result.data.user)));
        if (accountState.isRemembered) {
          StorageService.set("access_token", response.result.data.jwt);
          StorageService.set("role", response.result.data.user.role);
        } else {
          StorageService.setSession("access_token", response.result.data.jwt);
          StorageService.setSession("role", response.result.data.user.role);
        }
        navigate("/", { replace: true });
      }
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    subscribeOnce(AuthService.resetPassword(username), () => {
      setOpenDialog(true);
      setIsOpenPopup(false);
      setDialogContent(
        `Chúng tôi đã gửi một mật khẩu mới đến địa chỉ email của bạn,
         vui lòng kiểm tra hộp thư đến của bạn`
      );
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onEnterKeydown = (event: KeyboardEvent) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      handleLogin();
    }
  };

  useEventListener("keydown", onEnterKeydown);

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <PopupDialog
            title="Quên mật khẩu"
            openPopup={isOpenPopup}
            setOpenPopup={setIsOpenPopup}
          >
            <form
              className={classes.rootForm}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid container>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Controls.Input
                    name="username"
                    label="Username"
                    value={username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setUsername(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  <Controls.Button type="submit" text="Gửi đi" />
                  <Controls.Button
                    text="Đặt lại"
                    color="default"
                    onClick={() => setUsername("")}
                  />
                </div>
              </Grid>
            </form>
          </PopupDialog>
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
                <Link
                  to="#"
                  className="bs-text-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsOpenPopup(true);
                  }}
                >
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
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {dialogContent}
          </div>
          <div className="app-dialog-btn-close">
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
