import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { fetchUserById } from "../../api/usersService";
import { updateProfileUser } from "../../api/usersService";

import { useRecoilState } from "recoil";
import { userSeletor } from "../../recoil/userState";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Profile(props) {
  const { onUpdateSuccess } = props;

  const [openAlert, setOpenAlert] = useState(false);
  const [userState] = useRecoilState(userSeletor);
  const [editUser, setEditUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });
  const [alertRes, setAlertRes] = useState({
    typeAlert: "error",
    message: "",
  });

  useEffect(() => {
    if (userState.userId) {
      fetchUserById(userState.userId)
        .then((data) => {
          setEditUser({
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            email: data.email,
            phone: data.phone,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userState.userId]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const onValueChange = (event) => {
    const field = event.target.name;
    setEditUser({ ...editUser, [field]: event.target.value });
  };

  const onUpdate = () => {
    if (userState.userId) {
      updateProfileUser(userState.userId, editUser)
        .then((data) => {
          setAlertRes({
            typeAlert: "success",
            message: "Cập nhật thành công",
          });
          setOpenAlert(true);
          onUpdateSuccess();
        })
        .catch((err) => {
          setAlertRes({
            typeAlert: "error",
            message: "Cập nhật thất bại",
          });
          setOpenAlert(true);
        });
    }
  };

  return (
    <>
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
              value={editUser.email}
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
              value={editUser.phone}
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
              value={editUser.firstName}
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
              value={editUser.lastName}
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
              value={editUser.address}
              onChange={onValueChange}
            />
          </Box>
          <Box style={{ marginTop: "1.5em" }}>
            <Link to="/">Thay đổi mật khẩu</Link>
          </Box>
          <Box style={{ marginTop: "1.5em" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={onUpdate}
            >
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertRes.typeAlert}>
          {alertRes.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Profile;
