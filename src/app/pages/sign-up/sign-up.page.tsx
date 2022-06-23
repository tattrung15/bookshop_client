import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@material-ui/core";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useStyles } from "./make-style";
import AuthService from "@app/services/http/auth.service";
import useObservable from "@core/hooks/use-observable.hook";
import StorageService from "@core/services/storage";
import { CreateUserDto, User } from "@app/models/user.model";
import { storeUser } from "@app/store/auth/auth.action";
import HttpService from "@core/services/http/http.service";

export default function SignUp() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subscribeOnce } = useObservable();

  const [showPassword, setShowPassword] = useState(false);
  const [userDto, setUserDto] = useState<CreateUserDto>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const token = HttpService.getAccessToken() || "";

    subscribeOnce(AuthService.validate(token), (data) => {
      dispatch(storeUser(new User(data.result?.data.user)));
      StorageService.set("access_token", data.result?.data.jwt);
      StorageService.set("role", data.result?.data.user.role);
      navigate("/", { replace: true });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    subscribeOnce(AuthService.signUp(userDto), (response) => {
      dispatch(storeUser(new User(response.result?.data.user)));
      StorageService.set("access_token", response.result?.data.jwt);
      StorageService.set("role", response.result?.data.user.role);

      navigate("/", { replace: true });
    });
  };

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    setUserDto({ ...userDto, [field]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Tên"
                  value={userDto.firstName}
                  onChange={onValueChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Họ đệm"
                  name="lastName"
                  value={userDto.lastName}
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
                  value={userDto.username}
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
                  value={userDto.password}
                  onChange={onValueChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
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
                  value={userDto.email}
                  onChange={onValueChange}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Số điện thoại"
                  name="phone"
                  value={userDto.phone}
                  onChange={onValueChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="address"
                  label="Địa chỉ"
                  id="address"
                  value={userDto.address}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className="bs-text-primary">
                  Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </>
  );
}
