import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MoneyIcon from "@material-ui/icons/Money";

import OrderItem from "../../components/OrderItem";
import Footer from "../../components/Footer";

import { fetchOrderItemsByUserId } from "../../api/cartService";

import { useRecoilState } from "recoil";

import { userSeletor } from "../../recoil/userState";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    display: "flex",
    alignItems: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function calculateTotalAmount(products) {
  const totalAmount = products.reduce((acc, currentValue) => {
    return acc + currentValue.product.price * currentValue.quantity;
  }, 0);
  return totalAmount;
}

function Cart() {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [userState] = useRecoilState(userSeletor);
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
    }
  }, [userState.userId]);

  const updateProductsOnUpdateQuantity = () => {
    if (userState.userId) {
      fetchOrderItemsByUserId(userState.userId)
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
          setProducts([]);
        });
    }
  };

  const updateProductsOnDeleteOrderItem = () => {
    setOpenAlert(true);
    setAlertRes({
      typeAlert: "success",
      message: "Xóa thành công",
    });
    if (userState.userId) {
      fetchOrderItemsByUserId(userState.userId)
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
          setProducts([]);
        });
    }
  };

  const handleBuy = () => {
    //
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
            <Typography color="textPrimary">Giỏ hàng</Typography>
          </Breadcrumbs>
        </Box>
        <Box
          paddingX={5.5}
          maxWidth="1200px"
          style={{ margin: "0 auto", marginTop: "1em", textAlign: "center" }}
        >
          {products.length === 0 && (
            <>
              <Typography color="textPrimary">
                Giỏ hàng của bạn còn trống
              </Typography>
              <Box style={{ textAlign: "center", marginTop: "1em" }}>
                <Button variant="contained" color="primary">
                  <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Mua ngay
                  </Link>
                </Button>
              </Box>
              <Box style={{ marginTop: "20em" }}></Box>
            </>
          )}
        </Box>
        <Box paddingX={5.5} maxWidth="1200px" style={{ margin: "0 auto" }}>
          {products.length !== 0 && (
            <>
              <Box
                style={{
                  padding: "1em",
                }}
              >
                <Box style={{ display: "flex" }}>
                  <Grid item md={1} sm={1}>
                    ẢNH
                  </Grid>
                  <Grid item md={5} sm={5} className={classes.gridItem}>
                    <Typography color="textPrimary">TÊN SẢN PHẨM</Typography>
                  </Grid>
                  <Grid item md={2} sm={2} className={classes.gridItem}>
                    <Typography>GIÁ</Typography>
                  </Grid>
                  <Grid
                    item
                    md={2}
                    sm={2}
                    className={classes.gridItem}
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    SỐ LƯỢNG
                  </Grid>
                  <Grid
                    item
                    md={4}
                    sm={4}
                    className={classes.gridItem}
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    LỰA CHỌN
                  </Grid>
                </Box>
              </Box>
              {products &&
                products.map((item) => (
                  <OrderItem
                    item={item}
                    key={item.orderItemId}
                    onDeleteSuccess={updateProductsOnDeleteOrderItem}
                    onUpdateSuccess={updateProductsOnUpdateQuantity}
                  />
                ))}
              <Box
                style={{
                  padding: "1em",
                  border: "1px solid black",
                  borderRadius: "0.5em",
                  marginTop: "1em",
                }}
              >
                <Box style={{ display: "flex" }}>
                  <Grid item md={1} sm={1}></Grid>
                  <Grid item md={5} sm={5} className={classes.gridItem}></Grid>
                  <Grid item md={2} sm={2} className={classes.gridItem}>
                    <Typography>Tổng tiền: </Typography>
                  </Grid>
                  <Grid
                    item
                    md={2}
                    sm={2}
                    className={classes.gridItem}
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      color="secondary"
                      style={{ fontWeight: "bolder" }}
                    >
                      {calculateTotalAmount(products).toLocaleString("vn")}đ
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    sm={4}
                    className={classes.gridItem}
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<MoneyIcon />}
                      onClick={handleBuy}
                    >
                      Thanh toán
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Footer />
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertRes.typeAlert}>
          {alertRes.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Cart;
