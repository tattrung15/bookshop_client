import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Box } from "@material-ui/core";

import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

import CartItem from "../../components/CartItem";

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
        <Typography variant="h6" gutterBottom align="center">
          THỂ LOẠI
        </Typography>
        <ul className={classes.menuTopUl}>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              LỊCH SỬ - TRUYỀN THỐNG
            </Link>
          </li>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              KIẾN THỨC - KHOA HỌC
            </Link>
          </li>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              VĂN HỌC VIỆT NAM
            </Link>
          </li>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              VĂN HỌC NƯỚC NGOÀI
            </Link>
          </li>
        </ul>
        <ul className={classes.menuTopUl}>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              TRUYỆN TRANH
            </Link>
          </li>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              MANGA - COMIC
            </Link>
          </li>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              WINGS BOOKS
            </Link>
          </li>
          <li className={classes.menuTopUlLi}>
            <Link to="/" className={classes.menuTopUlLiLink}>
              GIẢI MÃ BẢN THÂN
            </Link>
          </li>
        </ul>
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
              <Link to="" style={{ color: "black", textDecoration: "none" }}>
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

      <Box marginTop={10} style={{ background: "#3F51B5" }}>
        <Box paddingX={4} maxWidth="930px" style={{ margin: "0 auto" }}>
          <div className={classes.footerContainer}>
            <Grid style={{ width: "50%" }}>
              <Box>
                <ul className={classes.footerMenu}>
                  <li>
                    <Link to="" className={classes.footerMenuItem}>
                      GIỚI THIỆU
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={classes.footerMenuItem}>
                      SÁCH
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={classes.footerMenuItem}>
                      TIN TỨC
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={classes.footerMenuItem}>
                      KHUYẾN MÃI
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={classes.footerMenuItem}>
                      LIÊN HỆ
                    </Link>
                  </li>
                </ul>
                <Box style={{ marginLeft: "2em" }}>
                  <TwitterIcon
                    fontSize="large"
                    style={{ color: "white", margin: "0 0.2em" }}
                  />
                  <FacebookIcon
                    fontSize="large"
                    style={{ color: "white", margin: "0 0.2em" }}
                  />
                  <InstagramIcon
                    fontSize="large"
                    style={{ color: "white", margin: "0 0.2em" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid style={{ width: "50%" }}>
              <Box style={{ textAlign: "center" }}>
                <h1>BOOKSHOP</h1>
                <Box style={{ marginTop: "5em" }}>
                  <Button style={{ marginRight: "1em" }} variant="contained">
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Đăng nhập
                    </Link>
                  </Button>
                  <Button style={{ marginRight: "1em" }} variant="contained">
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Đăng ký
                    </Link>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
}
