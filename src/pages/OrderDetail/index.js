import React, { useEffect, useState } from "react";

import moment from "moment";

import { Link, NavLink, useParams } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  makeStyles,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { useRecoilState } from "recoil";
import { userSeletor } from "../../recoil/userState";

import { fetchUserById } from "../../api/usersService";
import { fetchSaleOrderById } from "../../api/saleOrderService";
import CustomizedSteppers from "../../components/CustomizedSteppers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  linkA: {
    textDecoration: "none",
    color: "black",
  },
  productDetail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const findDeliveryIndex = {
  ChoXacNhan: 0,
  DangGiaoHang: 1,
  DaGiao: 2,
};

function calculateTotalAmount(orderItems) {
  return orderItems.reduce((acc, currentValue) => {
    return (
      acc +
      currentValue.orderItem.product.price * currentValue.orderItem.quantity
    );
  }, 0);
}

function ProductDetail(props) {
  const classes = useStyles();

  const { item } = props;

  return (
    <>
      <Box
        style={{
          marginTop: "0.5em",
          display: "flex",
        }}
      >
        <Grid item xs={5} md={5}>
          <Box
            style={{
              display: "flex",
            }}
          >
            <Grid item xs={4} md={4}>
              <img
                src={item.productImage.link}
                alt=""
                style={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={8} md={8}>
              <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
                {item.orderItem.product.title}
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3} md={3} className={classes.productDetail}>
          <Typography color="textPrimary">
            {item.orderItem.product.price.toLocaleString("vn")}đ
          </Typography>
        </Grid>
        <Grid item xs={2} md={2} className={classes.productDetail}>
          <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
            {item.orderItem.quantity}
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          md={3}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
            {(
              item.orderItem.product.price * item.orderItem.quantity
            ).toLocaleString("vn")}
            đ
          </Typography>
        </Grid>
      </Box>
      <Divider />
    </>
  );
}

export default function Profile() {
  const classes = useStyles();

  const { saleOrderId } = useParams();

  const [userState] = useRecoilState(userSeletor);
  const [deliveryIndex, setDeliveryIndex] = useState(0);
  const [saleOrder, setSaleOrder] = useState({
    orderItems: [],
  });
  const [currentUser, setCurrentUser] = useState({
    amount: 0,
  });

  useEffect(() => {
    if (userState.userId) {
      fetchUserById(userState.userId)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {});
    }

    fetchSaleOrderById(saleOrderId)
      .then((data) => {
        setSaleOrder(data);
        setDeliveryIndex(Number(findDeliveryIndex[data.delivery.index]));
      })
      .catch((err) => {});
  }, [saleOrderId, userState.userId]);

  return (
    <>
      <Box paddingTop={2} maxWidth="1200px" style={{ margin: "0 auto" }}>
        <Box paddingX={5.5} maxWidth="930px" style={{ margin: "0 auto" }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            style={{ background: "#EBE9E9", padding: "0.5em" }}
          >
            <Link color="inherit" to="/">
              Trang chủ
            </Link>
            <Link color="inherit" to="/profile/don-hang">
              Đơn hàng
            </Link>
            <Typography color="textPrimary">Chi tiết đơn hàng</Typography>
          </Breadcrumbs>
        </Box>
        <Box paddingTop={2} style={{ display: "flex" }}>
          <Grid item xs={3} md={3}>
            <Box style={{ padding: "1em 0 1em 1em" }}>
              <Box style={{ boxShadow: "-1px 0px 3px 1px #888888" }}>
                <Box style={{ padding: "0.5em" }}>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bolder" }}
                  >
                    {userState.userId &&
                      currentUser.firstName + " " + currentUser.lastName}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bolder" }}
                  >
                    Tiền:{" "}
                    {userState.userId &&
                      currentUser.amount.toLocaleString("vn")}
                    đ
                  </Typography>
                  <Box>
                    <ul style={{ listStyle: "none" }}>
                      <li style={{ marginTop: "1em" }}>
                        <NavLink
                          className={classes.linkA}
                          to="/profile"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "red",
                          }}
                          exact
                        >
                          <i
                            className="fa fa-edit"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.3em",
                            }}
                          ></i>{" "}
                          Thông tin tài khoản
                        </NavLink>
                      </li>
                      <li style={{ marginTop: "1em" }}>
                        <NavLink
                          className={classes.linkA}
                          to="/profile/don-hang"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "red",
                          }}
                          exact
                        >
                          <i
                            className="fa fa-list-alt"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.5em",
                            }}
                          ></i>{" "}
                          Đơn hàng
                        </NavLink>
                      </li>
                      <li style={{ marginTop: "1em" }}>
                        <NavLink
                          className={classes.linkA}
                          to="/profile/recharge"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "red",
                          }}
                          exact
                        >
                          <i
                            className="fa fa-money-bill"
                            style={{
                              fontSize: "larger",
                              marginRight: "0.3em",
                            }}
                          ></i>{" "}
                          Nap tiền
                        </NavLink>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
            <Box style={{ padding: "1em 1em 1em 0" }}>
              <Box
                style={{
                  boxShadow: "1px 0px 3px 1px #888888",
                  borderLeft: "1px solid black",
                  padding: "0.5em",
                }}
              >
                <Box>
                  <Typography color="textPrimary">
                    <span style={{ fontWeight: "bolder" }}>
                      Quản lý đơn hàng{" "}
                    </span>
                    / Chi tiết đơn hàng
                  </Typography>{" "}
                </Box>
                <Divider />
                <Box style={{ display: "flex" }}>
                  <Grid item xs={4} md={4}>
                    <Box>
                      Mã đơn hàng:{" "}
                      <span style={{ color: "blue" }}>{saleOrderId}</span>
                    </Box>
                    <Box>
                      Đặt ngày:{" "}
                      {moment(saleOrder.createAt).format("DD/MM/yyyy")}
                    </Box>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <CustomizedSteppers indexActiveStep={deliveryIndex} />
                  </Grid>
                </Box>
                <Box
                  style={{
                    border: "1px solid #BDBDBD",
                    padding: "0.5em",
                  }}
                >
                  <Typography color="textPrimary" style={{ fontWeight: "400" }}>
                    THÔNG TIN NHẬN HÀNG
                  </Typography>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bolder" }}
                  >
                    {saleOrder.user &&
                      saleOrder.user.firstName +
                        " " +
                        saleOrder.user.lastName +
                        " - " +
                        saleOrder.user.phone}
                  </Typography>
                  <Typography color="textPrimary">
                    {saleOrder && saleOrder.customerAddress}
                  </Typography>
                </Box>
                <Box
                  style={{
                    marginTop: "1em",
                    border: "1px solid #BDBDBD",
                    padding: "0.5em",
                  }}
                >
                  <Box style={{ display: "flex" }}>
                    <Grid item xs={5} md={5}>
                      <Typography
                        color="textPrimary"
                        style={{ fontWeight: "bolder" }}
                      >
                        Sản phẩm
                      </Typography>
                    </Grid>
                    <Grid item xs={3} md={3} style={{ textAlign: "center" }}>
                      <Typography
                        color="textPrimary"
                        style={{ fontWeight: "bolder" }}
                      >
                        Đơn giá
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={2} style={{ textAlign: "center" }}>
                      <Typography
                        color="textPrimary"
                        style={{ fontWeight: "bolder" }}
                      >
                        Số lượng
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      md={3}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Typography
                        color="textPrimary"
                        style={{ fontWeight: "bolder" }}
                      >
                        Thành tiền
                      </Typography>
                    </Grid>
                  </Box>
                  <Divider />
                  {saleOrder.orderItems.length !== 0 &&
                    saleOrder.orderItems.map((item) => (
                      <ProductDetail key={item.orderItem.id} item={item} />
                    ))}
                </Box>
                <Box style={{ display: "flex", padding: "0.5em" }}>
                  <Grid
                    item
                    xs={8}
                    md={8}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Typography
                      color="textPrimary"
                      style={{ fontWeight: "bolder" }}
                    >
                      Tổng tiền thanh toán:
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    md={4}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Typography
                      color="textPrimary"
                      style={{ fontWeight: "bolder", color: "red" }}
                    >
                      {saleOrder.orderItems.length !== 0 &&
                        calculateTotalAmount(
                          saleOrder.orderItems
                        ).toLocaleString("vn")}
                      đ
                    </Typography>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
