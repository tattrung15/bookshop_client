import React, { useEffect, useState } from "react";
import moment from "moment";

import { Grid, Box, makeStyles, Typography, Divider } from "@material-ui/core";

import { Form } from "../../components/Popup/UseForm";

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

export default function ViewSaleOrderForm(props) {
  const { recordForView } = props;

  const [saleOrder, setSaleOrder] = useState(null);
  const [deliveryIndex, setDeliveryIndex] = useState(0);

  useEffect(() => {
    fetchSaleOrderById(recordForView.saleOrderId)
      .then((data) => {
        setSaleOrder(data);
        setDeliveryIndex(Number(findDeliveryIndex[data.delivery.index]));
      })
      .catch((err) => {});
  }, [recordForView]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Box maxWidth="1200px" style={{ margin: "0 auto" }}>
            <Box style={{ display: "flex" }}>
              <Grid item xs={12}>
                <Box style={{ padding: "1em 1em 1em 0" }}>
                  <Box
                    style={{
                      boxShadow: "0px 0px 3px 1px #888888",
                      padding: "0.5em",
                    }}
                  >
                    <Box>
                      <Typography color="textPrimary">
                        Chi tiết đơn hàng
                      </Typography>{" "}
                    </Box>
                    <Divider />
                    <Box style={{ display: "flex" }}>
                      <Grid item xs={4} md={4}>
                        <Box>
                          Mã đơn hàng:{" "}
                          <span style={{ color: "blue" }}>
                            {recordForView.saleOrderId}
                          </span>
                        </Box>
                        <Box>
                          Đặt ngày:{" "}
                          {saleOrder &&
                            moment(saleOrder.createAt).format("DD/MM/yyyy")}
                        </Box>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        {saleOrder && (
                          <CustomizedSteppers indexActiveStep={deliveryIndex} />
                        )}
                      </Grid>
                    </Box>
                    <Box
                      style={{
                        border: "1px solid #BDBDBD",
                        padding: "0.5em",
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        style={{ fontWeight: "400" }}
                      >
                        THÔNG TIN NHẬN HÀNG
                      </Typography>
                      <Typography
                        color="textPrimary"
                        style={{ fontWeight: "bolder" }}
                      >
                        {saleOrder &&
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
                        <Grid
                          item
                          xs={3}
                          md={3}
                          style={{ textAlign: "center" }}
                        >
                          <Typography
                            color="textPrimary"
                            style={{ fontWeight: "bolder" }}
                          >
                            Đơn giá
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          md={2}
                          style={{ textAlign: "center" }}
                        >
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
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
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
                      {saleOrder &&
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
                          {saleOrder &&
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
        </Grid>
      </Grid>
    </Form>
  );
}
