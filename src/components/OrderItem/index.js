import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  Typography,
  makeStyles,
  ButtonGroup,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

import {
  fetchUpdateQuantity,
  fetchDeleteOrderItem,
} from "../../api/orderItemService";

import { useRecoilState } from "recoil";

import { cartSeletor } from "../../recoil/cartState";

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

function OrderItem(props) {
  const classes = useStyles();

  const { item, onDeleteSuccess, onUpdateSuccess } = props;

  const [openAlert, setOpenAlert] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [, setCartState] = useRecoilState(cartSeletor);
  const [alertRes, setAlertRes] = useState({
    typeAlert: "success",
    message: "",
  });

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleUpdate = () => {
    fetchUpdateQuantity(item.orderItemId, quantity)
      .then((data) => {
        setOpenAlert(true);
        setAlertRes({
          typeAlert: "success",
          message: "Cập nhật thành công",
        });
        onUpdateSuccess();
      })
      .catch((err) => {
        setOpenAlert(true);
        setAlertRes({
          typeAlert: "error",
          message: "Cập nhật thất bại",
        });
      });
  };

  const handleDelete = () => {
    fetchDeleteOrderItem(item.orderItemId)
      .then((data) => {
        setCartState({
          numberOfProducts: data.length,
        });
        onDeleteSuccess();
      })
      .catch((err) => {
        setOpenAlert(true);
        setAlertRes({
          typeAlert: "error",
          message: "Xóa thất bại",
        });
      });
  };

  return (
    <>
      <Box
        style={{
          padding: "1em",
          border: "1px solid black",
          borderRadius: "0.5em",
          marginTop: "1em",
        }}
      >
        <Box style={{ display: "flex" }}>
          <Grid item md={1} sm={1}>
            <img
              style={{ width: "50px" }}
              src={item.productImage.link}
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
              {quantity > 1 && <Button onClick={handleDecrement}>-</Button>}
              {quantity <= 1 && (
                <Button disabled onClick={handleDecrement}>
                  -
                </Button>
              )}
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
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertRes.typeAlert}>
          {alertRes.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default OrderItem;
