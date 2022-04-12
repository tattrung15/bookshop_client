import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
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
import { ResponseResult } from "@core/services/http/http.service";
import ProductItem from "@app/components/product-item";
import MainSlider from "@app/components/main-slider";
import { Role } from "@app/shared/types/user.type";
import useDestroy from "@core/hooks/use-destroy.hook";
import { fetchCart } from "@app/store/cart/cart.epic";
import { GlobalState } from "@app/store";

function HomePage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { destroy$ } = useDestroy();
  const { role } = useSelector(selectAuth);
  const { subscribeUntilDestroy } = useObservable();

  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [productCombo, setProductCombo] = useState<Product[]>([]);
  const [productWingsBooks, setProductWingsBooks] = useState<Product[]>([]);
  const [productComicManga, setProductComicManga] = useState<Product[]>([]);
  const [productBestSelling, setProductBestSelling] = useState<Product[]>([]);

  useEffect(() => {
    if (role === Role.MEMBER) {
      dispatch(fetchCart({ destroy$ }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  useEffect(() => {
    const options: ProductPaginationOption = {
      page: 1,
      perPage: 4,
      sort: "-quantityPurchased",
    };
    subscribeUntilDestroy(
      ProductService.getList(options),
      (response: ResponseResult) => {
        const data: Product[] = response.data.map(
          (item: any) => new Product(item)
        );
        setProductBestSelling(data);
      }
    );

    delete options.sort;
    subscribeUntilDestroy(
      ProductService.getList(options),
      (response: ResponseResult) => {
        const data: Product[] = response.data.map(
          (item: any) => new Product(item)
        );
        setNewProducts(data);
      }
    );

    subscribeUntilDestroy(
      ProductService.getListByCategory("combo", options),
      (response: ResponseResult) => {
        const data: Product[] = response.data.map(
          (item: any) => new Product(item)
        );
        setProductCombo(data);
      }
    );

    subscribeUntilDestroy(
      ProductService.getListByCategory("wings-books", options),
      (response: ResponseResult) => {
        const data: Product[] = response.data.map(
          (item: any) => new Product(item)
        );
        setProductWingsBooks(data);
      }
    );

    subscribeUntilDestroy(
      ProductService.getListByCategory("manga-comic", options),
      (response: ResponseResult) => {
        const data: Product[] = response.data.map(
          (item: any) => new Product(item)
        );
        setProductComicManga(data);
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
            <Link to="" className={classes.showMoreLink}>
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
            <Link to="" className={classes.showMoreLink}>
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
            <Link to="" className={classes.showMoreLink}>
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
            COMIC - MANGA
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
            <Link to="" className={classes.showMoreLink}>
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
            <Link to="" className={classes.showMoreLink}>
              <Button variant="contained">Xem thêm</Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

const selectAuth = (state: GlobalState) => state.auth;

export default HomePage;
