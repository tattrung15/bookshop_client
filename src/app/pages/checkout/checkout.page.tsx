import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import {
  Room as RoomIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useStyles } from "./make-style";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import AppBar from "@app/components/app-bar";
import { GlobalState } from "@app/store";
import { User } from "@app/models/user.model";
import useObservable from "@core/hooks/use-observable.hook";
import UserService from "@app/services/http/user.service";
import { OrderItem } from "@app/models/order-item.model";
import CartService from "@app/services/http/cart.service";
import { ResponseResult } from "@core/services/http/http.service";
import { Cart } from "@app/models/cart.model";
import {
  buildImageSrc,
  calculateTotalAmount,
} from "@app/shared/helpers/helpers";
import {
  imageNotFound,
  imagePaymentSuccessful,
} from "@app/shared/constants/common";
import SaleOrderService from "@app/services/http/sale-order.service";
import { fetchCart } from "@app/store/cart/cart.epic";
import useDestroy from "@core/hooks/use-destroy.hook";

const OrderItemInfo = ({ item }: { item: OrderItem }) => {
  return (
    <Box padding={2} style={{ display: "flex" }}>
      <Grid item xs={2} md={2}>
        <img
          src={
            !!item.product.productImages.length
              ? buildImageSrc(item.product.productImages[0].imageUrl)
              : imageNotFound
          }
          alt=""
          style={{ width: "48px" }}
        />
      </Grid>
      <Grid item xs={10} md={10}>
        <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
          {item.product.title}
        </Typography>
        <Box style={{ display: "flex" }}>
          <Typography color="secondary" style={{ fontWeight: "bolder" }}>
            {item.product.price.toLocaleString("vn") + "đ"}
          </Typography>
          <Typography
            color="textPrimary"
            style={{ fontWeight: "bolder", marginLeft: "2em" }}
          >
            {"x" + item.quantity}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};

function Checkout() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destroy$ } = useDestroy();
  const { id: userId } = useSelector(selectAuth);
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const [saleOrderId, setSaleOrderId] = useState<number>(0);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(new User(null));

  useEffect(() => {
    if (userId) {
      subscribeUntilDestroy(UserService.getUserById(userId), (data: User) => {
        setCurrentUser(data);
      });

      subscribeUntilDestroy(
        CartService.getCart(),
        (response: ResponseResult) => {
          if (response.data) {
            const responseData = response.data as Cart;
            responseData.orderItems.sort((a, b) => a.id - b.id);
            setOrderItems(responseData.orderItems);
            setSaleOrderId(responseData.id);
          } else {
            setSaleOrderId(0);
            navigate("/", { replace: true });
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onPaymentClick = () => {
    if (saleOrderId) {
      subscribeOnce(SaleOrderService.paymentSaleOrder(saleOrderId), () => {
        dispatch(fetchCart({ destroy$ }));
        setOrderItems([]);
        setSaleOrderId(0);
        setIsOrderSuccess(true);
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <AppBar />
      {!isOrderSuccess ? (
        <Box
          paddingTop={2}
          paddingX={5.5}
          maxWidth="1200px"
          style={{ margin: "0 auto" }}
        >
          <CustomBreadcrumbs
            navigation={[{ title: "Trang chủ", linkTo: "/" }]}
            textPrimary="Thanh toán"
          />
          <Box
            paddingTop={4}
            paddingX={5.5}
            maxWidth="1200px"
            style={{ margin: "0 auto", display: "flex" }}
          >
            <Grid item xs={7} md={7} style={{ padding: "0.5em" }}>
              <Box className={classes.blockShadow}>
                <Typography
                  className={classes.titleGradient}
                  color="textPrimary"
                >
                  <AssignmentTurnedInIcon className={classes.icon} />
                  Thông tin đơn hàng
                </Typography>
                {!!orderItems.length &&
                  orderItems.map((item, index) => (
                    <OrderItemInfo item={item} key={index} />
                  ))}
              </Box>
            </Grid>
            <Grid item xs={5} md={5} style={{ padding: "0.5em" }}>
              <Box className={classes.blockShadow}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid>
                    <Typography
                      className={classes.titleGradient}
                      color="textPrimary"
                    >
                      <RoomIcon className={classes.icon} />
                      Địa chỉ nhận hàng
                    </Typography>
                  </Grid>
                  <Grid>
                    <Link to="/profile" className={classes.changeProfileLink}>
                      Thay đổi ▶
                    </Link>
                  </Grid>
                </Box>
                <Box padding={2}>
                  {currentUser.username && (
                    <>
                      <span style={{ fontWeight: "bolder" }}>
                        {currentUser.firstName + " " + currentUser.lastName}
                      </span>
                      <span> | {currentUser.phone}</span>
                      <Typography
                        color="textPrimary"
                        style={{ marginTop: "0.5em" }}
                      >
                        {currentUser.address}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
              <Box className={classes.blockShadow} style={{ marginTop: "1em" }}>
                <Box className={classes.paddingFlexCenter}>
                  <Grid item xs={6} md={6}>
                    Tổng thanh toán
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography
                      color="secondary"
                      style={{ fontWeight: "bolder", fontSize: "1.5em" }}
                    >
                      {calculateTotalAmount(orderItems).toLocaleString("vn") +
                        "đ"}
                    </Typography>
                  </Grid>
                </Box>
                <Box className={classes.paddingFlexCenter}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onPaymentClick}
                  >
                    Thanh toán
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box maxWidth="100%" style={{ margin: "2em auto" }}>
          <Box
            paddingX={5.5}
            maxWidth="100%"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            <Typography
              variant="h5"
              style={{ fontWeight: "bolder" }}
              color="textPrimary"
            >
              Đặt hàng thành công
            </Typography>
          </Box>
          <div style={{ textAlign: "center" }}>
            <img src={imagePaymentSuccessful} alt="" width="30%" />
          </div>
          <div style={{ textAlign: "center", marginTop: "1em" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/", { replace: true })}
            >
              Tiếp tục mua
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "1em" }}
              onClick={() => navigate("/profile/order", { replace: true })}
            >
              Xem đơn hàng
            </Button>
          </div>
        </Box>
      )}
    </>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default Checkout;
