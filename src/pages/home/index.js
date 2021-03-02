import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";

import CartItem from "../../components/CartItem";

import { fetchProductImages } from "../../api/productImageService";

export default function HomePage() {
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    fetchProductImages().then((data) => {
      data.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
      setProductImage(data.slice(0, 4));
    });
  }, []);

  return (
    <>
      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5}>
          <Typography variant="h6" gutterBottom align="center">
            SÁCH MỚI
          </Typography>

          <div className="row">
            {productImage &&
              productImage.map((val, index) => (
                <CartItem key={index} item={val} />
              ))}
          </div>
        </Box>

        <Box marginTop={5}>
          <Typography variant="h6" gutterBottom align="center">
            SÁCH BÁN CHẠY
          </Typography>

          <div className="row">
            {productImage &&
              productImage.map((val, index) => (
                <CartItem key={index} item={val} />
              ))}
          </div>
        </Box>
      </Box>
    </>
  );
}
