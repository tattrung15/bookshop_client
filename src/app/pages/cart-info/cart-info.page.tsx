import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Money as MoneyIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useStyles } from "./make-style";
import AppBar from "@app/components/app-bar";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import useObservable from "@core/hooks/use-observable.hook";
import { OrderItem } from "@app/models/order-item.model";
import CartService from "@app/services/http/cart.service";
import { Cart } from "@app/models/cart.model";
import CartItem from "@app/components/cart-item";
import { calculateTotalAmount } from "@app/shared/helpers/helpers";
import useForceUpdate from "@core/hooks/use-force-update.hook";
import { fetchCart } from "@app/store/cart/cart.epic";
import useDestroy from "@core/hooks/use-destroy.hook";

function CartInfo() {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { destroy$ } = useDestroy();
  const { subscribeUntilDestroy } = useObservable();
  const [forceUpdate, setForceUpdate] = useForceUpdate();

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    subscribeUntilDestroy(CartService.getCart(), (response) => {
      if (response.data) {
        const responseData = response.data as Cart;
        responseData.orderItems.sort((a, b) => a.id - b.id);
        setOrderItems(responseData.orderItems);
      } else {
        setOrderItems([]);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdate]);

  const handleOnUpdateSuccess = () => {
    setForceUpdate();
  };

  const handleOnDeleteSuccess = () => {
    setForceUpdate();
    dispatch(fetchCart({ destroy$ }));
  };

  const onBtnOrderClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <AppBar />
      <Box
        paddingTop={2}
        paddingX={5.5}
        maxWidth="1200px"
        style={{ margin: "0 auto" }}
      >
        <CustomBreadcrumbs
          navigation={[{ title: "Trang chủ", linkTo: "/" }]}
          textPrimary="Giỏ hàng"
        />
        <Box
          paddingX={5.5}
          maxWidth="1200px"
          className={classes.cartEmptyWrapper}
        >
          {!orderItems.length && (
            <>
              <Typography color="textPrimary">
                Giỏ hàng của bạn trống
              </Typography>
              <Box style={{ textAlign: "center", marginTop: "1em" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  <Button variant="contained" color="primary">
                    Mua ngay
                  </Button>
                </Link>
              </Box>
              <Box style={{ marginTop: "20em" }}></Box>
            </>
          )}
        </Box>
        <Box paddingX={5.5} maxWidth="1200px" style={{ margin: "0 auto" }}>
          {!!orderItems.length && (
            <>
              <Box style={{ display: "flex", padding: "1em" }}>
                <Grid item md={1} sm={1}>
                  <Typography style={{ fontWeight: "bold" }}>ẢNH</Typography>
                </Grid>
                <Grid item md={5} sm={5} className={classes.gridItem}>
                  <Typography style={{ fontWeight: "bold" }}>
                    TÊN SẢN PHẨM
                  </Typography>
                </Grid>
                <Grid item md={2} sm={2} className={classes.gridItem}>
                  <Typography style={{ fontWeight: "bold" }}>GIÁ</Typography>
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
                  <Typography style={{ fontWeight: "bold" }}>
                    SỐ LƯỢNG
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
                  <Typography style={{ fontWeight: "bold" }}>
                    LỰA CHỌN
                  </Typography>
                </Grid>
              </Box>
              {!!orderItems.length &&
                orderItems.map((item, index) => (
                  <CartItem
                    item={item}
                    key={index}
                    onUpdateSuccess={handleOnUpdateSuccess}
                    onDeleteSuccess={handleOnDeleteSuccess}
                  />
                ))}
              <Box className={classes.totalAmountWrapper}>
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
                      {!!orderItems.length &&
                        `${calculateTotalAmount(orderItems).toLocaleString(
                          "vn"
                        )}đ`}
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
                      onClick={onBtnOrderClick}
                    >
                      Đặt hàng
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CartInfo;
