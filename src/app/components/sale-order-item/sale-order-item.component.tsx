import { Link } from "react-router-dom";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { OrderItem } from "@app/models/order-item.model";
import { imageNotFound } from "@app/shared/constants/common";
import { buildImageSrc } from "@app/shared/helpers/helpers";
import { useStyles } from "./make-style";

function SaleOrderItem({ item }: { item: OrderItem }) {
  const classes = useStyles();

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
                src={
                  !!item.product.productImages.length
                    ? buildImageSrc(item.product.productImages[0].imageUrl)
                    : imageNotFound
                }
                alt=""
                style={{ width: "80%" }}
              />
            </Grid>
            <Grid item xs={8} md={8}>
              <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
                <Link
                  to={`/products/${item.product.slug}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {item.product.title}
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3} md={3} className={classes.textCenter}>
          <Typography color="textPrimary">
            {item.product.price.toLocaleString("vn")}đ
          </Typography>
        </Grid>
        <Grid item xs={2} md={2} className={classes.textCenter}>
          <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
            {item.quantity}
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
            {(item.product.price * item.quantity).toLocaleString("vn") + "đ"}
          </Typography>
        </Grid>
      </Box>
      <Divider />
    </>
  );
}

export default SaleOrderItem;
