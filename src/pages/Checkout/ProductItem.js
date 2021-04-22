import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";

function ProductItem(props) {
  const { item } = props;
  return (
    <>
      <Box padding={2} style={{ display: "flex" }}>
        <Grid item xs={2} md={2}>
          <img src={item.productImage.link} alt="" style={{ width: "48px" }} />
        </Grid>
        <Grid item xs={10} md={10}>
          <Typography color="textPrimary" style={{ fontWeight: "bolder" }}>
            {item.product.title}
          </Typography>
          <Box style={{ display: "flex" }}>
            <Typography color="secondary" style={{ fontWeight: "bolder" }}>
              {item.product.price.toLocaleString("vn")}đ
            </Typography>
            <Typography
              color="textPrimary"
              style={{ fontWeight: "bolder", marginLeft: "2em" }}
            >
              x{item.quantity}
            </Typography>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default ProductItem;
