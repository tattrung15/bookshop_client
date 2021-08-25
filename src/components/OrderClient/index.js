import React, { useEffect, useState } from "react";

import { NavLink, Route, Switch } from "react-router-dom";

import { Box, Typography, Snackbar, makeStyles } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import StateDelivery from "../StateDelivery";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyle = makeStyles((theme) => ({
  navLink: { padding: "0.5em 1em", color: "black", textDecoration: "none" },
  listNavLink: {
    listStyle: "none",
    display: "flex",
    padding: 0,
    borderBottom: "1px solid #BDBDBD",
  },
}));

function OrderClient() {
  const classes = useStyle();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertRes] = useState({
    typeAlert: "error",
    message: "",
  });

  useEffect(() => {}, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      <Box>
        <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
          Quản lý đơn hàng
        </Typography>
      </Box>
      <Box>
        <ul className={classes.listNavLink}>
          <li>
            <NavLink
              className={classes.navLink}
              to="/profile/don-hang"
              activeStyle={{
                color: "red",
              }}
              exact
            >
              Chờ xác nhận
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.navLink}
              to="/profile/don-hang/delivering"
              activeStyle={{
                color: "red",
              }}
            >
              Đang giao hàng
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.navLink}
              to="/profile/don-hang/pod"
              activeStyle={{
                color: "red",
              }}
            >
              Đã giao
            </NavLink>
          </li>
          <li>
            <NavLink
              className={classes.navLink}
              to="/profile/don-hang/cancel"
              activeStyle={{
                color: "red",
              }}
            >
              Đã hủy
            </NavLink>
          </li>
        </ul>
      </Box>
      <Switch>
        <Route path="/profile/don-hang" exact>
          <StateDelivery
            state={"ChoXacNhan"}
            indexActiveStep={0}
            stateStep={true}
          />
        </Route>
        <Route path="/profile/don-hang/delivering">
          <StateDelivery
            state={"DangGiaoHang"}
            indexActiveStep={1}
            stateStep={true}
          />
        </Route>
        <Route path="/profile/don-hang/pod">
          <StateDelivery
            state={"DaGiao"}
            indexActiveStep={3}
            stateStep={true}
          />
        </Route>
        <Route path="/profile/don-hang/cancel">
          <StateDelivery state={"DaHuy"} stateStep={false} />
        </Route>
      </Switch>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertRes.typeAlert}>
          {alertRes.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default OrderClient;
