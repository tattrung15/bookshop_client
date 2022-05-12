import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import clsx from "clsx";
import CustomizedSteppers from "../customized-steppers";
import { SaleOrder } from "@app/models/sale-order.model";
import {
  DEFAULT_DATETIME_FORMAT,
  DELIVERY_INDEX,
  DELIVERY_INDEX_MAP,
  imageNotFound,
} from "@app/shared/constants/common";
import {
  buildImageSrc,
  calculateTotalAmount,
} from "@app/shared/helpers/helpers";
import { useStyles } from "./make-style";

type PropTypes = {
  item: SaleOrder;
};

function OrderItem(props: PropTypes) {
  const { item } = props;

  const classes = useStyles();

  const [deliveryIndex, setDeliveryIndex] = useState(() => {
    return DELIVERY_INDEX_MAP[DELIVERY_INDEX.WAITING_TO_CONFIRM];
  });

  useEffect(() => {
    if (item.id) {
      setDeliveryIndex(DELIVERY_INDEX_MAP[item.delivery.index]);
    }
  }, [item]);

  return (
    <Box className={classes.orderItemWrapper}>
      <Box className={classes.orderItemHeader}>
        <Grid item xs={4} md={4}>
          <Box>
            Mã đơn hàng:{" "}
            <Link
              to={`/profile/order-detail/${item.id}`}
              className={clsx(classes.orderItemLink, "bs-text-primary")}
            >
              {item.id}
            </Link>
            {" | "}
            <Link
              to={`/profile/order-detail/${item.id}`}
              className={clsx(classes.orderItemLink, "bs-text-primary")}
            >
              Chi tiết
            </Link>
          </Box>
          <Box>
            Thời gian đặt hàng:
            <br />
            {dayjs(item.orderedAt).format(DEFAULT_DATETIME_FORMAT)}
          </Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <Box>
            Người nhận: {item.user.firstName + " " + item.user.lastName}
          </Box>
        </Grid>
        <Grid item xs={4} md={4} style={{ textAlign: "right" }}>
          <Box>
            Tổng tiền:{" "}
            {`${calculateTotalAmount(item.orderItems).toLocaleString("vn")}đ`}
          </Box>
        </Grid>
      </Box>
      <Box style={{ padding: "0.5em" }}>
        <Box className={classes.flex}>
          <Grid item xs={6} md={6} className={classes.flex}>
            <img
              style={{ width: "78px" }}
              src={
                !!item.orderItems.length &&
                !!item.orderItems[0].product.productImages.length
                  ? buildImageSrc(
                      item.orderItems[0].product.productImages[0].imageUrl
                    )
                  : imageNotFound
              }
              alt=""
            />
            <Typography className={classes.orderItemTitle}>
              <Link
                to={`/products/${item.orderItems[0].product.slug}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {item.orderItems[0].product.title}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <CustomizedSteppers indexActiveStep={deliveryIndex} />
          </Grid>
        </Box>
      </Box>
      <Box style={{ padding: "0.5em" }}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            to={`/profile/order-detail/${item.id}`}
            className={clsx(classes.orderItemLink, "bs-text-primary")}
          >
            {"Theo dõi đơn hàng >>"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default OrderItem;
