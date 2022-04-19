import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Box, Grid, Paper, Tooltip, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useStyles } from "./make-style";
import { GlobalState } from "@app/store";
import UserService from "@app/services/http/user.service";
import useObservable from "@core/hooks/use-observable.hook";
import { User } from "@app/models/user.model";
import ProfileForm from "@app/components/profile-form";
import AppBar from "@app/components/app-bar";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import OrderInfo from "../order-info";
import { DELIVERY_STATE } from "@app/shared/constants/common";
import OrderDetail from "../order-detail";

const handleLinkActiving = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? {
        fontWeight: "bold",
        color: "red",
      }
    : {};
};

const TypographyPrimary: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = (props) => {
  return (
    <Typography noWrap color="textPrimary" {...props}>
      {props.children}
    </Typography>
  );
};

function Profile() {
  const classes = useStyles();

  const { subscribeOnce } = useObservable();

  const location = useLocation();
  const { id: userId } = useSelector(selectAuth);
  const query = new URLSearchParams(location.search);

  const [title, setTitle] = useState("Thông tin tài khoản");
  const [state, setState] = useState(DELIVERY_STATE.WAITING_TO_CONFIRM);
  const [breadcrumbs, setBreadcrumbs] = useState({
    navigation: [{ title: "Trang chủ", linkTo: "/" }],
    textPrimary: "Thông tin tài khoản",
  });
  const [currentUser, setCurrentUser] = useState<User>(new User(null));

  useEffect(() => {
    if (userId) {
      subscribeOnce(UserService.getUserById(userId), (data) => {
        setCurrentUser(data);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (location.pathname === "/profile") {
      setTitle("Thông tin tài khoản");
      setBreadcrumbs({
        navigation: [{ title: "Trang chủ", linkTo: "/" }],
        textPrimary: "Thông tin tài khoản",
      });
    } else if (location.pathname === "/profile/order") {
      setState(query.get("state") ?? DELIVERY_STATE.WAITING_TO_CONFIRM);
      setTitle("Đơn hàng");
      setBreadcrumbs({
        navigation: [{ title: "Trang chủ", linkTo: "/" }],
        textPrimary: "Đơn hàng",
      });
    } else if (location.pathname === "/profile/recharge") {
      setTitle("Nạp tiền");
      setBreadcrumbs({
        navigation: [{ title: "Trang chủ", linkTo: "/" }],
        textPrimary: "Nạp tiền",
      });
    } else if (location.pathname.includes("/profile/order-detail/")) {
      setTitle("Chi tiết đơn hàng");

      setBreadcrumbs({
        navigation: [
          { title: "Trang chủ", linkTo: "/" },
          { title: "Đơn hàng", linkTo: `/profile/order?state=${state}` },
        ],
        textPrimary: "Chi tiết đơn hàng",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onUpdateSuccess = () => {
    if (userId) {
      subscribeOnce(UserService.getUserById(userId), (data) => {
        setCurrentUser(data);
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <AppBar />
      <Box paddingTop={2} className={classes.container}>
        {!!breadcrumbs.navigation.length && (
          <CustomBreadcrumbs
            navigation={breadcrumbs.navigation}
            textPrimary={breadcrumbs.textPrimary}
          />
        )}
        <Box paddingTop={2} style={{ display: "flex" }}>
          <Grid item xs={3} md={3} style={{ marginRight: "1em" }}>
            <Paper>
              <Box className={classes.menuLeft}>
                <Tooltip
                  title={
                    !!currentUser.id &&
                    currentUser?.firstName + " " + currentUser?.lastName
                  }
                  placement="top-start"
                  arrow
                  classes={{ tooltip: classes.customWidth }}
                >
                  <span>
                    <TypographyPrimary className={classes.typographyBolder}>
                      {!!currentUser.id &&
                        currentUser?.firstName + " " + currentUser?.lastName}
                    </TypographyPrimary>
                  </span>
                </Tooltip>
                <TypographyPrimary className={classes.typographyBolder}>
                  Tiền:{" "}
                  {!!currentUser.id &&
                    currentUser?.amount?.toLocaleString("vn") + "đ"}
                </TypographyPrimary>
                <Box>
                  <ul style={{ listStyle: "none" }}>
                    <li className={classes.itemNavLink}>
                      <NavLink
                        className={classes.navLink}
                        to="/profile"
                        style={handleLinkActiving}
                        end
                      >
                        <i className={clsx("fa fa-edit", classes.menuIcon)}></i>{" "}
                        Thông tin tài khoản
                      </NavLink>
                    </li>
                    <li className={classes.itemNavLink}>
                      <NavLink
                        className={classes.navLink}
                        to={`/profile/order?state=${DELIVERY_STATE.WAITING_TO_CONFIRM}`}
                        style={handleLinkActiving}
                      >
                        <i
                          className={clsx("fa fa-list-alt", classes.menuIcon)}
                        ></i>{" "}
                        Đơn hàng
                      </NavLink>
                    </li>
                    <li className={classes.itemNavLink}>
                      <NavLink
                        className={classes.navLink}
                        to="/profile/recharge"
                        style={handleLinkActiving}
                      >
                        <i
                          className={clsx("fa fa-money-bill", classes.menuIcon)}
                        ></i>{" "}
                        Nạp tiền
                      </NavLink>
                    </li>
                  </ul>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={9} md={9}>
            <Routes>
              <Route
                path=""
                element={<ProfileForm onUpdateSuccess={onUpdateSuccess} />}
              />
              <Route
                path="order"
                element={
                  <Box style={{ padding: "1em 1em 1em 0" }}>
                    <Paper>
                      <Box style={{ padding: "0.5em" }}>
                        <OrderInfo />
                      </Box>
                    </Paper>
                  </Box>
                }
              />
              <Route
                path="order-detail/:saleOrderId"
                element={<OrderDetail />}
              />
              <Route
                path="recharge"
                element={
                  <Box style={{ padding: "1em 1em 1em 0" }}>
                    <Paper>
                      <Box style={{ padding: "0.5em" }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                          Liên hệ số điện thoại: 0396 500 ***
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                }
              ></Route>
            </Routes>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default Profile;
