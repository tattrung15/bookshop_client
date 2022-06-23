import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import {
  bannerCombo,
  bannerManga,
  bannerWingsbooks,
} from "@app/shared/constants/common";
import Footer from "@app/components/footer";
import { useStyles } from "./make-style";
import AppBar from "@app/components/app-bar";
import ProductService, {
  ProductPaginationOption,
} from "@app/services/http/product.service";
import useObservable from "@core/hooks/use-observable.hook";
import { Product } from "@app/models/product.model";
import ProductItem from "@app/components/product-item";
import MainSlider from "@app/components/main-slider";

function HomePage() {
  const classes = useStyles();

  const { subscribeUntilDestroy } = useObservable();

  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [productCombo, setProductCombo] = useState<Product[]>([]);
  const [productWingsBooks, setProductWingsBooks] = useState<Product[]>([]);
  const [productComicManga, setProductComicManga] = useState<Product[]>([]);
  const [productBestSelling, setProductBestSelling] = useState<Product[]>([]);

  useEffect(() => {
    const options: ProductPaginationOption = {
      page: 1,
      perPage: 4,
      sort: "-quantityPurchased",
    };
    subscribeUntilDestroy(ProductService.getList(options), (response) => {
      setProductBestSelling(response.data as Product[]);
    });

    delete options.sort;
    subscribeUntilDestroy(ProductService.getList(options), (response) => {
      setNewProducts(response.data as Product[]);
    });

    subscribeUntilDestroy(
      ProductService.getListByCategory("combo", options),
      (response) => {
        setProductCombo(response.data as Product[]);
      }
    );

    subscribeUntilDestroy(
      ProductService.getListByCategory("wings-books", options),
      (response) => {
        setProductWingsBooks(response.data as Product[]);
      }
    );

    subscribeUntilDestroy(
      ProductService.getListByCategory("manga-comic", options),
      (response) => {
        setProductComicManga(response.data as Product[]);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <AppBar />
      <MainSlider />
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
              {!!newProducts.length &&
                newProducts.map((item, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <ProductItem item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>

          <Box className={classes.showMoreBox}>
            <Link to="/products" className={classes.showMoreLink}>
              <Button variant="contained">Xem thêm</Button>
            </Link>
          </Box>
        </Box>

        <Box marginTop={5} marginBottom={5}>
          <Typography variant="h6" gutterBottom align="center">
            SÁCH BÁN CHẠY
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {!!productBestSelling.length &&
                productBestSelling.map((item, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <ProductItem item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>

          <Box className={classes.showMoreBox}>
            <Link
              to="/products?mode=top-selling"
              className={classes.showMoreLink}
            >
              <Button variant="contained">Xem thêm</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <div className="banner-combo">
        <img className={classes.bannerComboImg} src={bannerCombo} alt="" />
      </div>

      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5} marginBottom={5}>
          <Typography variant="h6" gutterBottom align="center">
            COMBO
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productCombo &&
                productCombo.map((item, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <ProductItem item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>

          <Box className={classes.showMoreBox}>
            <Link
              to="/products?category=combo"
              className={classes.showMoreLink}
            >
              <Button variant="contained">Xem thêm</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <div className="banner-manga">
        <img className={classes.bannerMangaImg} src={bannerManga} alt="" />
      </div>

      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5}>
          <Typography variant="h6" gutterBottom align="center">
            MANGA - COMIC
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1}>
              {productComicManga &&
                productComicManga.map((item, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <ProductItem item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>

          <Box className={classes.showMoreBox}>
            <Link
              to="/products?category=manga-comic"
              className={classes.showMoreLink}
            >
              <Button variant="contained">Xem thêm</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <div className="banner-wings">
        <img
          className={classes.bannerWingsBooksImg}
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
              {productWingsBooks &&
                productWingsBooks.map((item, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <ProductItem item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>

          <Box className={classes.showMoreBox}>
            <Link
              to="/products?category=wings-books"
              className={classes.showMoreLink}
            >
              <Button variant="contained">Xem thêm</Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default HomePage;
