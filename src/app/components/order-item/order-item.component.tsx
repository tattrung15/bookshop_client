import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography, ButtonGroup } from "@material-ui/core";
import { Delete as DeleteIcon, Save as SaveIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useStyles } from "./make-style";
import { OrderItem } from "@app/models/order-item.model";
import { buildImageSrc } from "@app/shared/helpers/helpers";
import { imageNotFound, TYPE_ALERT } from "@app/shared/constants/common";
import useObservable from "@core/hooks/use-observable.hook";
import OrderItemService from "@app/services/http/order-item.service";

type PropTypes = {
  item: OrderItem;
  onUpdateSuccess: () => void;
  onDeleteSuccess: () => void;
};

function OrderItemComponent(props: PropTypes) {
  const classes = useStyles();
  const { item, onUpdateSuccess, onDeleteSuccess } = props;

  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item]);

  const { subscribeOnce } = useObservable();
  const { enqueueSnackbar } = useSnackbar();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleUpdate = () => {
    subscribeOnce(OrderItemService.updateQuantity(item.id, quantity), () => {
      enqueueSnackbar("Cập nhật số lượng thành công", {
        variant: TYPE_ALERT.SUCCESS,
      });
      onUpdateSuccess();
    });
  };

  const handleDelete = () => {
    subscribeOnce(OrderItemService.deleteOrderItem(item.id), () => {
      enqueueSnackbar("Xóa sản phẩm trong giỏ hàng thành công", {
        variant: TYPE_ALERT.SUCCESS,
      });
      onDeleteSuccess();
    });
  };

  return (
    <Box className={classes.orderItemWrapper}>
      <Box style={{ display: "flex" }}>
        <Grid item md={1} sm={1}>
          <img
            style={{ width: "50px" }}
            src={
              !!item.product.productImages.length
                ? buildImageSrc(item.product.productImages[0].imageUrl)
                : imageNotFound
            }
            alt=""
          />
        </Grid>
        <Grid item md={5} sm={5} className={classes.gridItem}>
          <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
            <Link
              to={`/products/${item.product.slug}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {item.product.title}
            </Link>
          </Typography>
        </Grid>
        <Grid item md={2} sm={2} className={classes.gridItem}>
          <Typography color="secondary" style={{ fontWeight: "bolder" }}>
            {item.product.price.toLocaleString("vn")}đ
          </Typography>
        </Grid>
        <Grid item md={2} sm={2} className={classes.gridItem}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button disabled={quantity <= 1} onClick={handleDecrement}>
              -
            </Button>
            <Button disabled style={{ color: "black", width: "5em" }}>
              {quantity}
            </Button>
            <Button onClick={handleIncrement}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item md={4} sm={4} className={classes.gridItem}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleUpdate}
          >
            Cập nhật
          </Button>
          <Button
            style={{ marginLeft: "2em" }}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Xóa
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}

export default OrderItemComponent;
