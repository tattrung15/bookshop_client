import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { GlobalState } from "@app/store";
import { useSelector } from "react-redux";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import { UpdateUserDto } from "@app/models/user.model";

function ProfileForm() {
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

  const onValueChange = (event) => {
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
    });
  };

  return (
    <Box style={{ padding: "1em 1em 1em 0" }}>
      <Box
        style={{
          boxShadow: "1px 0px 3px 1px #888888",
          borderLeft: "1px solid black",
        }}
      >
        <Box style={{ padding: "0.5em" }}>
          <Box>
            <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
              Thông tin tài khoản
            </Typography>
            <Divider style={{ margin: "0.5em auto" }} />
            <Box maxWidth={"50%"} style={{ margin: "0 auto" }}>
              <Box>
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
              <Box style={{ marginTop: "1.5em" }}>
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
              <Box style={{ marginTop: "1.5em" }}>
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
              <Box style={{ marginTop: "1.5em" }}>
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
              <Box style={{ marginTop: "1.5em" }}>
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
              <Box style={{ marginTop: "1.5em" }}>
                <Link to="#">Thay đổi mật khẩu</Link>
              </Box>
              <Box style={{ marginTop: "1.5em" }}>
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
        </Box>
      </Box>
    </Box>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default memo(ProfileForm);
