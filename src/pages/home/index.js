import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Box } from "@material-ui/core";

import Footer from "../../components/Footer";
import CartItem from "../../components/CartItem";
import CategoryHeader from "../../components/CategoryHeader";

import bannerDangKy from "../../img/banner_dangky_mail.jpg";
import bannerDoremon from "../../img/doremon.png";
import bannerWingsbooks from "../../img/banner_wingsbooks.jpg";

import {
  fetchProductImages,
  fetchProductImageBestSelling,
} from "../../api/productImageService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bannerEmail: {
    backgroundImage: `url(${bannerDangKy})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    marginBottom: "4%",
  },
  emaill: {
    textAlign: "center",
  },
  emaillP: {
    fontWeight: "bold",
    color: "white",
    fontSize: "20px",
    paddingTop: "2%",
  },
  emaillForm: {
    paddingBottom: "3%",
  },
  emaillFormInput: {
    width: "19%",
    border: "none",
    marginRight: "1em",
    padding: "0.6em",
  },
  banneDoremonImg: {
    height: "50%",
    width: "100%",
    marginTop: "2em",
  },
  banneWingsBooksImg: {
    height: "50%",
    width: "100%",
    marginBottom: "1em",
  },
  footerContainer: {
    display: "flex",
    color: "white",
    paddingBottom: "1.5em",
  },
  footerMenu: {
    listStyle: "none",
  },
  footerMenuItem: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bolder",
    lineHeight: "1.5em",
  },
  menuTopUl: {
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  menuTopUlLi: {
    margin: "0.5em",
  },
  menuTopUlLiLink: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bolder",
    textTransform: "uppercase",
    "&:hover": {
      color: "red",
    },
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const [productImage, setProductImage] = useState([]);
  const [productImageBestSelling, setProductImageBestSelling] = useState([]);

  useEffect(() => {
    fetchProductImages()
      .then((data) => {
        data.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
        setProductImage(data.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
    fetchProductImageBestSelling()
      .then((data) => {
        setProductImageBestSelling(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box
        paddingTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <CategoryHeader />
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
              {productImage &&
                productImage.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CartItem item={val} />
                  </Grid>
                ))}
            </Grid>
          </div>

          <Box style={{ textAlign: "center", marginTop: "1em" }}>
            <Button variant="contained">
              <Link
                to="/categories/sach-moi"
                style={{ color: "black", textDecoration: "none" }}
              >
                Xem thêm
              </Link>
            </Button>
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
                    <CartItem item={val} />
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
              {productImageBestSelling &&
                productImageBestSelling.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CartItem item={val} />
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
              {productImageBestSelling &&
                productImageBestSelling.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CartItem item={val} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
