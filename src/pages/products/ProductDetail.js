import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Button,
  makeStyles,
  Typography,
  TextField,
  Snackbar,
} from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import MuiImageSlider from "mui-image-slider";

import MuiAlert from "@material-ui/lab/Alert";

import CategoryHeader from "../../components/CategoryHeader";
import CardItem from "../../components/CardItem";
import Footer from "../../components/Footer";

import { fetchPostCart } from "../../api/cartService";
import { fetchProductBySlug } from "../../api/productService";
import { fetchProductsBySlugOfCategory } from "../../api/categoryService";

import { useRecoilState } from "recoil";

import { userSeletor } from "../../recoil/userState";
import { cartSeletor } from "../../recoil/cartState";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "500px",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProductDetail() {
  const classes = useStyles();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(null);
  const [userState] = useRecoilState(userSeletor);
  const [openAlert, setOpenAlert] = useState(false);
  const [bookOfCategory, setBookOfCategory] = useState([]);
  const [, setCartState] = useRecoilState(cartSeletor);
  const [productImages, setProductImages] = useState(["https"]);
  const [alertRes, setAlertRes] = useState({
    typeAlert: "error",
    message: "",
  });

  let { slug } = useParams();

  useEffect(() => {
    fetchProductBySlug(slug)
      .then((data) => {
        setCategory(data.product.category.name);
        setProduct(data.product);

        let arrImages = [];
        data.productImages.forEach((item) => {
          arrImages.push(item.link);
        });
        setProductImages(arrImages);

        fetchProductsBySlugOfCategory(data.product.category.slug, 1)
          .then((data) => {
            setBookOfCategory(data.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  const onQuantityChange = (ev) => {
    setQuantity(ev.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const onClickBtnBuy = (ev) => {
    const regex = /^\d+$/;
    if (quantity <= 0 || !regex.test(quantity)) {
      setAlertRes({
        typeAlert: "error",
        message: "Số lượng không hợp lệ",
      });
      setOpenAlert(true);
      return;
    }
    if (!userState.userId) {
      setAlertRes({
        typeAlert: "error",
        message: "Bạn cần đăng nhập",
      });
      setOpenAlert(true);
    }
    const orderItem = {
      userId: userState.userId,
      productId: product.id,
      quantity: parseInt(quantity),
    };
    fetchPostCart(orderItem)
      .then((data) => {
        setCartState({
          numberOfProducts: data.length,
        });
        setAlertRes({
          typeAlert: "success",
          message: "Thêm vào giỏ hàng thành công",
        });
        setOpenAlert(true);
      })
      .catch((err) => {
        console.log(err);
        setAlertRes({
          typeAlert: "error",
          message: "Thêm vào giỏ hàng thất bại",
        });
      });
  };

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
      <Box paddingX={5.5} maxWidth="930px" style={{ margin: "0 auto" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          style={{ background: "#EBE9E9", padding: "0.5em" }}
        >
          <Link color="inherit" to="/">
            Trang chủ
          </Link>
          <Link color="inherit" to="/">
            Thể loại
          </Link>
          <Link color="inherit" to="/">
            {category}
          </Link>
          <Typography color="textPrimary">{product.title}</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        paddingTop={2}
        paddingX={5.5}
        maxWidth="992px"
        style={{ margin: "0 auto", display: "flex" }}
      >
        <Grid item xs={4} sm={4}>
          <Box>
            <MuiImageSlider
              images={productImages}
              classes={{ root: classes.wrapper }}
            />
          </Box>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Box paddingTop={2} paddingX={5.5}>
            <Typography variant="h6" color="textPrimary">
              {product.title}
            </Typography>
            <Divider />
            <Box style={{ display: "flex" }}>
              <Grid item xs={7} sm={7}>
                <ul>
                  <li>
                    Tác giả:{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {product.author}
                    </span>
                  </li>
                  <li>
                    Số trang:{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {product.numberOfPage}
                    </span>
                  </li>
                  <li>
                    Còn:{" "}
                    <span style={{ fontWeight: "bolder" }}>
                      {product.currentNumber}
                    </span>
                  </li>
                </ul>
              </Grid>
              <Grid
                item
                xs={5}
                sm={5}
                style={{ textAlign: "right", marginTop: "1em" }}
              >
                <Box>
                  <Button variant="outlined" style={{ width: "14em" }}>
                    Giá: {Number(product.price).toLocaleString("vn")}đ
                  </Button>
                </Box>
                <Box style={{ marginTop: "1em" }}>
                  <TextField
                    onChange={onQuantityChange}
                    size="small"
                    id="outlined-number"
                    label="Số lượng"
                    type="number"
                    defaultValue={1}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: "12em" }}
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    style={{
                      width: "14em",
                      marginTop: "0.5em",
                      marginBottom: "1em",
                    }}
                    onClick={onClickBtnBuy}
                  >
                    Mua ngay
                  </Button>
                </Box>
              </Grid>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h6" color="textPrimary">
                Giới thiệu tác phẩm
              </Typography>
              {product.longDescription}
            </Box>
          </Box>
        </Grid>
      </Box>
      <Box
        paddingTop={10}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Typography
          variant="h6"
          color="textPrimary"
          style={{
            margin: "0 auto",
            background: "#EBE9E9",
            padding: "0.2em",
          }}
        >
          Sách cùng thể loại
        </Typography>
        <Box marginTop={2}>
          <div className={classes.rootItem}>
            <Grid container spacing={1}>
              {bookOfCategory &&
                bookOfCategory.slice(0, 4).map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CardItem item={val} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>
      <Footer />
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertRes.typeAlert}>
          {alertRes.message}
        </Alert>
      </Snackbar>
    </>
  );
}
