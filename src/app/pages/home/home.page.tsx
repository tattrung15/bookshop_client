import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

import { useStyles } from "./make-style";

import { bannerDoremon, bannerWingsbooks } from "@app/shared/constants/common";

export default function HomePage() {
  const classes = useStyles();

  const [productImage, setProductImage] = useState([]);
  const [productImageDoraemon, setProductImageDoraemon] = useState([]);
  const [productImageWingsBooks, setProductImageWingsBooks] = useState([]);
  const [productImageComicManga, setProductImageComicManga] = useState([]);
  const [productImageBestSelling, setProductImageBestSelling] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      <Box
        paddingTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        {/* <CategoryHeader /> */}
      </Box>
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
              {/* {productImage &&
                productImage.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CardItem item={val} />
                  </Grid>
                ))} */}
            </Grid>
          </div>

          <Box style={{ textAlign: "center", marginTop: "1em" }}>
            {/* <Link
              to="/categories/sach-moi"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Button variant="contained">Xem thêm</Button>
            </Link> */}
          </Box>
        </Box>

        <Box marginTop={5} marginBottom={5}>
          <Typography variant="h6" gutterBottom align="center">
            SÁCH BÁN CHẠY
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productImageBestSelling &&
                productImageBestSelling.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    {/* <CardItem item={val} /> */}
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>

      <div className={classes.bannerEmail}>
        <div className="email">
          <div className={classes.emaill}>
            <p className={classes.emaillP}>ĐĂNG KÝ EMAIL NHẬN THÔNG TIN</p>
            <form className={classes.emaillForm}>
              <input className={classes.emaillFormInput} type="text" name="" />
              <Button variant="contained">Đăng ký</Button>
            </form>
          </div>
        </div>
      </div>

      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5}>
          <Typography variant="h6" gutterBottom align="center">
            COMIC - MANGA
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productImageComicManga &&
                productImageComicManga.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    {/* <CardItem item={val} /> */}
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>

      <div className="banner-doremon">
        <img className={classes.banneDoremonImg} src={bannerDoremon} alt="" />
      </div>

      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5} marginBottom={5}>
          <Typography variant="h6" gutterBottom align="center">
            DORAEMON
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productImageDoraemon &&
                productImageDoraemon.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    {/* <CardItem item={val} /> */}
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>

      <div className="banner-wings">
        <img
          className={classes.banneWingsBooksImg}
          src={bannerWingsbooks}
          alt=""
        />
      </div>

      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5} marginBottom={5}>
          <Typography variant="h6" gutterBottom align="center">
            WINGS BOOKS
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productImageWingsBooks &&
                productImageWingsBooks.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    {/* <CardItem item={val} /> */}
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
}
