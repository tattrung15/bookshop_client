import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Grid, Box, Typography, Divider } from "@material-ui/core";
import { calculateTotalAmount } from "@app/shared/helpers/helpers";
import {
  DEFAULT_DATE_FORMAT,
  DELIVERY_INDEX,
  DELIVERY_INDEX_MAP,
} from "@app/shared/constants/common";
import { Form } from "@app/hooks/use-form.hook";
import { SaleOrder } from "@app/models/sale-order.model";
import { Delivery } from "@app/models/delivery.model";
import CustomizedSteppers from "../customized-steppers";
import Controls from "@app/components/controls";
import SaleOrderItem from "../sale-order-item";

type PropTypes = {
  isView: boolean;
  isEdit: boolean;
  recordForAction: SaleOrder;
  deliveries: Delivery[];
  updateSaleOrderDelivery: (saleOrderId: number, deliveryId: number) => void;
};

function SaleOrderForm(props: PropTypes) {
  const {
    isView,
    isEdit,
    recordForAction,
    deliveries,
    updateSaleOrderDelivery,
  } = props;

  const [deliveryIndex, setDeliveryIndex] = useState(0);
  const [deliveryIndexChange, setDeliveryIndexChange] = useState<number>(() => {
    return recordForAction.delivery.id;
  });

  useEffect(() => {
    if (recordForAction.id) {
      setDeliveryIndex(DELIVERY_INDEX_MAP[recordForAction.delivery.index]);
      setDeliveryIndexChange(recordForAction.delivery.id);
    }
  }, [recordForAction]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEdit) {
      updateSaleOrderDelivery(recordForAction.id, deliveryIndexChange);
    }
  };

  const handleDeliverySelectedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    setDeliveryIndexChange(value);
  };

  return (
    <>
      {isView && (
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
                                {recordForAction.id}
                              </span>
                            </Box>
                            <Box>
                              Đặt ngày:{" "}
                              {recordForAction.id &&
                                dayjs(recordForAction.orderedAt).format(
                                  DEFAULT_DATE_FORMAT
                                )}
                            </Box>
                          </Grid>
                          <Grid item xs={8} md={8}>
                            {recordForAction.id && (
                              <CustomizedSteppers
                                indexActiveStep={deliveryIndex}
                              />
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
                            {recordForAction &&
                              recordForAction.user.firstName +
                                " " +
                                recordForAction.user.lastName +
                                " | " +
                                recordForAction.user.phone}
                          </Typography>
                          <Typography color="textPrimary">
                            {recordForAction.id &&
                              recordForAction.customerAddress}
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
                          {recordForAction &&
                            recordForAction.orderItems.map((item, index) => (
                              <SaleOrderItem key={index} item={item} />
                            ))}
                        </Box>
                        <Box style={{ display: "flex", padding: "0.5em" }}>
                          <Grid
                            item
                            xs={8}
                            md={8}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
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
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Typography
                              color="textPrimary"
                              style={{ fontWeight: "bolder", color: "red" }}
                            >
                              {recordForAction &&
                                calculateTotalAmount(
                                  recordForAction.orderItems
                                ).toLocaleString("vn") + "đ"}
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
      )}
      {isEdit && (
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              {recordForAction.id && (
                <Box style={{ textAlign: "center" }}>
                  <Controls.Input
                    name="saleOrderId"
                    label="Mã đơn hàng"
                    value={recordForAction.id}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={6}>
              {!!deliveries.length && (
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Controls.Select
                    style={{ textAlign: "left" }}
                    name="deliveryId"
                    label="Trạng thái"
                    value={deliveryIndexChange}
                    options={deliveries
                      .filter(
                        (delivery) =>
                          ![
                            DELIVERY_INDEX.ADDED_TO_CART,
                            DELIVERY_INDEX.CANCELED,
                          ].includes(delivery.index)
                      )
                      .map((delivery) => ({
                        id: delivery.id,
                        title: delivery.value,
                      }))}
                    onChange={handleDeliverySelectedChange}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <div style={{ textAlign: "center" }}>
                <Controls.Button type="submit" text="Submit" />
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
}

export default SaleOrderForm;
