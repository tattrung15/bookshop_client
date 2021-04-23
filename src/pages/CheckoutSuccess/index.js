import React from "react";

import { useHistory } from "react-router-dom";

import { Box, Button, Typography } from "@material-ui/core";

import DatHangThanhCongImg from "../../img/dat-hang-thanh-cong.jpg";

function CheckoutSuccess() {
  const history = useHistory();

  return (
    <>
      <Box
        paddingTop={2}
        paddingX={5.5}
        maxWidth="1200px"
        style={{ margin: "0 auto" }}
      >
        <Box
          paddingX={5.5}
          maxWidth="50%"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          <img style={{ width: "80%" }} src={DatHangThanhCongImg} alt="" />
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
          <Box maxWidth="100%" style={{ margin: "1em auto" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/");
              }}
            >
              Tiếp tục mua sắm
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "1em" }}
              onClick={() => {
                history.push("/profile/don-hang");
              }}
            >
              Xem đơn hàng
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CheckoutSuccess;
