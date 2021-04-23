import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Typography,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import RoomIcon from "@material-ui/icons/Room";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import { fetchUserById } from "../../api/usersService";
import { fetchPostOrder } from "../../api/orderItemService";
import { fetchOrderItemsByUserId } from "../../api/cartService";

import { useRecoilState } from "recoil";

import { userSeletor } from "../../recoil/userState";
import { cartSeletor } from "../../recoil/cartState";

import ProductItem from "./ProductItem";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function calculateTotalAmount(products) {
  const totalAmount = products.reduce((acc, currentValue) => {
    return acc + currentValue.product.price * currentValue.quantity;
  }, 0);
  return totalAmount;
}

function Checkout() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [userState] = useRecoilState(userSeletor);
  const [openAlert, setOpenAlert] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [, setCartState] = useRecoilState(cartSeletor);
  const [alertRes, setAlertRes] = useState({
    typeAlert: "success",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    if (userState.userId) {
      fetchOrderItemsByUserId(userState.userId)
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          setProducts([]);
        });
      fetchUserById(userState.userId)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userState.userId]);

  const onBuyClick = () => {
    if (userState.userId) {
      const saleOrder = {
        userId: currentUser.id,
        saleOrderId: products[0].saleOrder.id,
        totalAmount: calculateTotalAmount(products),
      };
      fetchPostOrder(saleOrder)
        .then((data) => {
          setCartState({
            numberOfProducts: 0,
          });
          history.push("/checkout/success");
        })
        .catch(async (err) => {
          const resError = await err.json();
          if (resError.message === "Not enough money") {
            setAlertRes({
              typeAlert: "error",
              message: "Bạn không đủ tiền",
            });
            setOpenAlert(true);
            return;
          }
          setAlertRes({
            typeAlert: "error",
            message: "Đặt mua thất bại",
          });
          setOpenAlert(true);
        });
    }
  };

  return (
    <>
      <Box
        paddingTop={2}
        paddingX={5.5}
        maxWidth="1200px"
        style={{ margin: "0 auto" }}
      >
        <Box paddingX={5.5} maxWidth="1200px" style={{ margin: "0 auto" }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            style={{ background: "#EBE9E9", padding: "0.5em" }}
          >
            <Link color="inherit" to="/">
              Trang chủ
            </Link>
            <Typography color="textPrimary">Xác nhận - Thanh toán</Typography>
          </Breadcrumbs>
        </Box>

        <Box
          paddingTop={4}
          paddingX={5.5}
          maxWidth="1200px"
          style={{ margin: "0 auto", display: "flex" }}
        >
          <Grid item xs={7} md={7} style={{ padding: "0.5em" }}>
            <Box style={{ boxShadow: "0px 0px 2px 1px #888888" }}>
              <Box>
                <Typography
                  style={{
                    display: "flex",
                    padding: "0.5em 0",
                    backgroundImage: "linear-gradient(90deg,#ebf8ff,#fff)",
                  }}
                  color="textPrimary"
                >
                  <AssignmentTurnedInIcon style={{ margin: "0 0.5em" }} />
                  Thông tin đơn hàng
                </Typography>
                {products &&
                  products.map((item) => (
                    <ProductItem key={item.orderItemId} item={item} />
                  ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5} md={5} style={{ padding: "0.5em" }}>
            <Box style={{ boxShadow: "0px 0px 2px 1px #888888" }}>
              <Box>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid>
                    <Typography
                      style={{
                        display: "flex",
                        padding: "0.5em 0",
                        backgroundImage: "linear-gradient(90deg,#ebf8ff,#fff)",
                      }}
                      color="textPrimary"
                    >
                      <RoomIcon style={{ margin: "0 0.5em" }} />
                      Địa chỉ nhận hàng
                    </Typography>
                  </Grid>
                  <Grid>
                    <Link
                      to="/profile"
                      style={{
                        display: "flex",
                        padding: "0.5em 0.5em",
                        color: "#4a90e2",
                        textDecoration: "none",
                      }}
                    >
                      Thay đổi ▶
                    </Link>
                  </Grid>
                </Box>
                <Box padding={2}>
                  <span style={{ fontWeight: "bolder" }}>
                    {currentUser &&
                      currentUser.firstName + " " + currentUser.lastName}
                  </span>
                  <span> | {currentUser.phone}</span>
                  <Typography
                    color="textPrimary"
                    style={{ marginTop: "0.5em" }}
                  >
                    {currentUser.address}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              style={{ boxShadow: "0px 0px 2px 1px #888888", marginTop: "1em" }}
            >
              <Box
                style={{
                  display: "flex",
                  padding: "1em",
                  alignItems: "center",
                }}
              >
                <Grid item xs={6} md={6}>
                  Tổng thanh toán
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography
                    color="secondary"
                    style={{ fontWeight: "bolder", fontSize: "1.5em" }}
                  >
                    {calculateTotalAmount(products).toLocaleString("vn")}đ
                  </Typography>
                </Grid>
              </Box>
              <Box
                style={{
                  display: "flex",
                  padding: "1em",
                  alignItems: "center",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onBuyClick}
                >
                  Đặt mua
                </Button>
              </Box>
            </Box>
          </Grid>
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

export default Checkout;
