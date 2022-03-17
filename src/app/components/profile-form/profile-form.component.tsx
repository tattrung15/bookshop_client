import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { GlobalState } from "@app/store";
import { useSelector } from "react-redux";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import { UpdateUserDto } from "@app/models/user.model";
import { useStyles } from "./make-style";

type PropTypes = {
  onUpdateSuccess: () => void;
};

function ProfileForm(props: PropTypes) {
  const { onUpdateSuccess } = props;

  const classes = useStyles();
  const { subscribeOnce } = useObservable();

  const { id: userId } = useSelector(selectAuth);
  const [userInfo, setUserInfo] = useState<UpdateUserDto>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    subscribeOnce(UserService.getUserById(userId), (data) => {
      setUserInfo({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        phone: data.phone,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const onUpdateButtonClick = () => {
    subscribeOnce(UserService.updateUser(userId, userInfo), (data) => {
      setUserInfo({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        phone: data.phone,
      });
      onUpdateSuccess();
    });
  };

  return (
    <Box className={classes.root}>
      <Paper>
        <Box className={classes.wrapForm}>
          <Typography color="textPrimary" className={classes.formTitle}>
            Thông tin tài khoản
          </Typography>
          <Divider style={{ margin: "0.5em auto" }} />
          <Box maxWidth={"50%"} className={classes.wrapFields}>
            <Box className={classes.fieldMarginTop}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                value={userInfo.email}
                onChange={onValueChange}
              />
            </Box>
            <Box className={classes.fieldMarginTop}>
              <TextField
                id="phone"
                name="phone"
                label="Số điện thoại"
                variant="outlined"
                size="small"
                fullWidth
                value={userInfo.phone}
                onChange={onValueChange}
              />
            </Box>
            <Box className={classes.fieldMarginTop}>
              <TextField
                id="firstName"
                name="firstName"
                label="Họ và tên đệm"
                variant="outlined"
                size="small"
                fullWidth
                value={userInfo.firstName}
                onChange={onValueChange}
              />
            </Box>
            <Box className={classes.fieldMarginTop}>
              <TextField
                id="lastName"
                name="lastName"
                label="Tên"
                variant="outlined"
                size="small"
                fullWidth
                value={userInfo.lastName}
                onChange={onValueChange}
              />
            </Box>
            <Box className={classes.fieldMarginTop}>
              <TextField
                id="address"
                name="address"
                label="Địa chỉ"
                variant="outlined"
                size="small"
                fullWidth
                value={userInfo.address}
                onChange={onValueChange}
              />
            </Box>
            <Box className={classes.fieldMarginTop}>
              <Link to="#">Thay đổi mật khẩu</Link>
            </Box>
            <Box
              className={clsx(
                classes.fieldMarginTop,
                classes.fieldMarginBottom
              )}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onUpdateButtonClick}
              >
                Cập nhật
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default memo(ProfileForm);
