import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  Button,
} from "@material-ui/core";
import CustomizedSteppers from "@app/components/customized-steppers";
import {
  DEFAULT_DATETIME_FORMAT,
  DELIVERY_INDEX,
  DELIVERY_INDEX_MAP,
} from "@app/shared/constants/common";
import { SaleOrder } from "@app/models/sale-order.model";
import useObservable from "@core/hooks/use-observable.hook";
import SaleOrderService from "@app/services/http/sale-order.service";
import SaleOrderItem from "@app/components/sale-order-item";
import { calculateTotalAmount } from "@app/shared/helpers/helpers";
import { useStyles } from "./make-style";
import ConfirmDialog from "@app/components/confirm-dialog";
import useForceUpdate from "@core/hooks/use-force-update.hook";

function OrderDetail() {
  const classes = useStyles();

  const { saleOrderId } = useParams();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [saleOrder, setSaleOrder] = useState<SaleOrder>(new SaleOrder(null));
  const [deliveryIndex, setDeliveryIndex] = useState(() => {
    return DELIVERY_INDEX_MAP[DELIVERY_INDEX.WAITING_TO_CONFIRM];
  });

  useEffect(() => {
    const saleOrderIdParsed = parseInt(saleOrderId ?? "");
    if (saleOrderIdParsed) {
      subscribeUntilDestroy(
        SaleOrderService.getSaleOrderForMember(saleOrderIdParsed),
        (data: SaleOrder) => {
          setSaleOrder(data);
          setDeliveryIndex(DELIVERY_INDEX_MAP[data.delivery.index]);
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleOrderId, forceUpdate]);

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const handleCancelSaleOrder = () => {
    if (saleOrder.id) {
      subscribeOnce(SaleOrderService.cancelSaleOrder(saleOrder.id), () => {
        setForceUpdate();
      });
    }
  };

  return (
    <>
      <Box className={classes.orderDetailWrapper}>
        <Paper>
          <Box style={{ padding: "0.5em" }}>
            <Box style={{ display: "flex" }}>
              <Typography color="textPrimary" style={{ marginTop: "auto" }}>
                <span style={{ fontWeight: "bolder" }}>Đơn hàng </span>
                <span>/ Chi tiết đơn hàng</span>
              </Typography>
              {saleOrder.delivery?.index ===
                DELIVERY_INDEX.WAITING_TO_CONFIRM && (
                <Box style={{ marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={openConfirmDialog}
                  >
                    Hủy đơn hàng
                  </Button>
                </Box>
              )}
            </Box>
            <Divider style={{ margin: "0.5em 0 0.5em 0" }} />
            <Box style={{ display: "flex" }}>
              <Grid item xs={4} md={4}>
                <Box>
                  Mã đơn hàng:{" "}
                  <span className="bs-text-primary">{saleOrderId}</span>
                </Box>
                <Box>
                  Thời gian đặt hàng:
                  <br />
                  {dayjs(saleOrder.orderedAt).format(DEFAULT_DATETIME_FORMAT)}
                </Box>
              </Grid>
              <Grid item xs={8} md={8}>
                <CustomizedSteppers indexActiveStep={deliveryIndex} />
              </Grid>
            </Box>
            <Box className={classes.orderInfo}>
              <Typography color="textPrimary" style={{ fontWeight: "400" }}>
                THÔNG TIN NHẬN HÀNG
              </Typography>
              <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
                {saleOrder.user &&
                  saleOrder.user.firstName +
                    " " +
                    saleOrder.user.lastName +
                    " | " +
                    saleOrder.user.phone}
              </Typography>
              <Typography color="textPrimary">
                {saleOrder && saleOrder.customerAddress}
              </Typography>
            </Box>
            <Box className={classes.orderItemInfo}>
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
                <Grid item xs={3} md={3} className={classes.flexEnd}>
                  <Typography
                    color="textPrimary"
                    style={{ fontWeight: "bolder" }}
                  >
                    Thành tiền
                  </Typography>
                </Grid>
              </Box>
              <Divider />
              {!!saleOrder.id &&
                !!saleOrder.orderItems.length &&
                saleOrder.orderItems.map((item, index) => (
                  <SaleOrderItem key={index} item={item} />
                ))}
            </Box>
            <Box style={{ display: "flex", padding: "0.5em" }}>
              <Grid item xs={8} md={8} className={classes.flexEnd}>
                <Typography
                  color="textPrimary"
                  style={{ fontWeight: "bolder" }}
                >
                  Tổng tiền thanh toán:
                </Typography>
              </Grid>
              <Grid item xs={4} md={4} className={classes.flexEnd}>
                <Typography
                  color="textPrimary"
                  style={{ fontWeight: "bolder", color: "red" }}
                >
                  {!!saleOrder.id &&
                    !!saleOrder.orderItems.length &&
                    calculateTotalAmount(saleOrder.orderItems).toLocaleString(
                      "vn"
                    ) + "đ"}
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ConfirmDialog
        title="Hủy đơn hàng?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleCancelSaleOrder}
      >
        Bạn có muốn hủy đơn hàng không?
      </ConfirmDialog>
    </>
  );
}

export default OrderDetail;
