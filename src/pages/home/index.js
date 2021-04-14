import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { Typography } from "@material-ui/core";

import CartItem from "../../components/CartItem";

import { fetchProductImages } from "../../api/productImageService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    fetchProductImages()
      .then((data) => {
        data.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
        setProductImage(data.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
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

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productImage &&
                productImage.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CartItem item={val} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>

        <Box marginTop={5} marginBottom={5}>
          <Typography variant="h6" gutterBottom align="center">
            SÁCH BÁN CHẠY
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productImage &&
                productImage.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CartItem item={val} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
}
