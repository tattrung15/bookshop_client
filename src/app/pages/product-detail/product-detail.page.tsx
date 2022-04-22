import React, { useEffect, useState, createRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { ShoppingCart as ShoppingCartIcon } from "@material-ui/icons";
import MuiImageSlider from "mui-image-slider";
import { switchMap } from "rxjs/operators";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Helmet } from "react-helmet-async";
import { useStyles } from "./make-style";
import { Product } from "@app/models/product.model";
import AppBar from "@app/components/app-bar";
import MainSlider from "@app/components/main-slider";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import useObservable from "@core/hooks/use-observable.hook";
import ProductService, {
  ProductPaginationOption,
} from "@app/services/http/product.service";
import Footer from "@app/components/footer";
import { buildImageSrc } from "@app/shared/helpers/helpers";
import {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import ProductItem from "@app/components/product-item";
import ViewService from "@app/services/view.service";
import { imageNotFound, TYPE_ALERT } from "@app/shared/constants/common";
import { CreateCartDto } from "@app/models/cart.model";
import CartService from "@app/services/http/cart.service";
import { fetchCart } from "@app/store/cart/cart.epic";
import useDestroy from "@core/hooks/use-destroy.hook";

function ProductDetail() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { slug } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { destroy$ } = useDestroy();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>(new Product(null));
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [lastViewProducts, setLastViewProducts] = useState<Product[]>([]);

  const pageRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (slug) {
      subscribeUntilDestroy(
        ProductService.getDetail(slug).pipe(
          switchMap((product) => {
            setProduct(product);
            setQuantity(1);
            const options: PaginationOption = {
              page: 1,
              perPage: 4,
            };
            return ProductService.getListByCategory(
              product.category.id,
              options
            );
          })
        ),
        (response: ResponseResult) => {
          setSimilarProducts(response.data as Product[]);
        }
      );
    }

    const lastViewIds = ViewService.getLastView();
    if (!!lastViewIds.length) {
      const options: ProductPaginationOption = {
        page: 1,
        perPage: 4,
        ids: lastViewIds,
      };
      subscribeUntilDestroy(
        ProductService.getList(options),
        (response: ResponseResult) => {
          setLastViewProducts(response.data as Product[]);
        }
      );
    }

    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const onQuantityChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+ev.target.value);
  };

  const onAddToCartClick = () => {
    if (quantity <= 0) {
      enqueueSnackbar("Số lượng không hợp lệ", {
        variant: TYPE_ALERT.WARNING,
      });
    }

    const cartDto: CreateCartDto = {
      productId: product.id,
      quantity,
    };
    subscribeOnce(CartService.addToCart(cartDto), () => {
      dispatch(fetchCart({ destroy$ }));
      enqueueSnackbar("Thêm vào giỏ hàng thành công", {
        variant: TYPE_ALERT.SUCCESS,
      });
    });
  };

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>{product.title && product.title}</title>
      </Helmet>
      <AppBar />
      <Box paddingTop={2}>
        {product.category?.name && (
          <CustomBreadcrumbs
            navigation={[
              { title: "Trang chủ", linkTo: "/" },
              { title: "Thể loại", linkTo: "/categories" },
              {
                title: product.category.name,
                linkTo: `/products?category=${product.category.slug}`,
              },
            ]}
            textPrimary={product.title}
          />
        )}
      </Box>
      <MainSlider shouldShowBanner={false} />
      <Box
        paddingTop={4}
        paddingX={5.5}
        maxWidth="992px"
        style={{ margin: "0 auto", display: "flex" }}
      >
        <Grid item xs={4} sm={4}>
          <Box>
            {!!product.productImages?.length && (
              <MuiImageSlider
                images={product.productImages.map((item) =>
                  buildImageSrc(item.imageUrl)
                )}
                classes={{ root: classes.wrapper }}
              />
            )}
            {!product.productImages?.length && (
              <img
                src={imageNotFound}
                alt="Not found"
                style={{ width: "100%", height: "500px" }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Box paddingTop={2} paddingX={3}>
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
                    Thể loại:{" "}
                    <Link
                      to={`/products?category=${product.category?.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span style={{ fontWeight: "bolder" }}>
                        {product.category?.name}
                      </span>
                    </Link>
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
                    value={quantity}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    style={{ width: "12em" }}
                    variant="outlined"
                  />
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      className={classes.btnAddToCart}
                      onClick={onAddToCartClick}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Box>
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
          <div>
            <Grid container spacing={1}>
              {!!similarProducts.length &&
                similarProducts.map((item, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <ProductItem item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>

          <Box className={classes.showMoreBox}>
            <Link
              to={
                product.category
                  ? `/products?category=${product.category.slug}`
                  : ""
              }
              className={classes.showMoreLink}
            >
              <Button variant="contained">Xem thêm</Button>
            </Link>
          </Box>
        </Box>
      </Box>
      {!!lastViewProducts.length && (
        <Box
          paddingTop={5}
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
            Sản phẩm đã xem
          </Typography>
          <Box marginTop={2}>
            <div>
              <Grid container spacing={1}>
                {!!lastViewProducts.length &&
                  lastViewProducts.map((item, index) => (
                    <Grid key={index} item xs={6} sm={3}>
                      <ProductItem item={item} />
                    </Grid>
                  ))}
              </Grid>
            </div>

            <Box className={classes.showMoreBox}>
              <Link to="/products-viewed" className={classes.showMoreLink}>
                <Button variant="contained">Xem thêm</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
      <Footer />
    </div>
  );
}

export default ProductDetail;
