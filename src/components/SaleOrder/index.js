import React from "react";

import moment from "moment";

import { Link, useHistory } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@material-ui/core";
import CustomizedSteppers from "../CustomizedSteppers";

function calculateTotalAmount(orderItems) {
  const totalAmount = orderItems.reduce((acc, currentValue) => {
    return acc + currentValue.product.price * currentValue.quantity;
  }, 0);
  return totalAmount;
}

function SaleOrder(props) {
  const { saleOrder, indexActiveStep, stateStep } = props;

  const history = useHistory();

  return (
    <Box style={{ border: "1px solid #BDBDBD", marginBottom: "0.5em" }}>
      <Box style={{ background: "#F5F5F5" }}>
        <Box style={{ display: "flex", padding: "0.5em" }}>
          <Grid item xs={4} md={4}>
            <Box>
              Mã đơn hàng:{" "}
              <Link
                to={`/chi-tiet-don-hang/${saleOrder.id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                {saleOrder.id}
              </Link>{" "}
              |{" "}
              <Link
                to={`/chi-tiet-don-hang/${saleOrder.id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                Chi tiết
              </Link>
            </Box>
            <Box>
              Đặt ngày: {moment(saleOrder.createAt).format("DD/MM/yyyy")}
            </Box>
          </Grid>
          <Grid item xs={4} md={4} style={{ textAlign: "center" }}>
            <Box>Người nhận:</Box>
            <Box>
              {saleOrder.user.firstName + " " + saleOrder.user.lastName}
            </Box>
          </Grid>
          <Grid item xs={4} md={4} style={{ textAlign: "right" }}>
            <Box>Tổng tiền:</Box>
            <Box>
              {calculateTotalAmount(saleOrder.orderItems).toLocaleString("vn")}đ
            </Box>
          </Grid>
        </Box>
      </Box>
      <Box style={{ padding: "0.5em" }}>
        <Box style={{ display: "flex" }}>
          <Grid item xs={6} md={6} style={{ display: "flex" }}>
            <img
              style={{ width: "78px" }}
              src={`${saleOrder.productImage.link}`}
              alt=""
            />
            <Typography style={{ fontWeight: "bolder", marginLeft: "0.5em" }}>
              {saleOrder.orderItems[0].product.title}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            {stateStep && (
              <CustomizedSteppers indexActiveStep={indexActiveStep} />
            )}
          </Grid>
        </Box>
      </Box>
      <Box style={{ padding: "0.5em" }}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/chi-tiet-don-hang/${saleOrder.id}`);
            }}
          >
            Theo dõi đơn hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SaleOrder;
