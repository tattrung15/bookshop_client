import React, { useEffect, useState, createRef } from "react";
import { useParams } from "react-router-dom";
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
import { ResponseResult } from "@core/services/http/http.service";
import { PRODUCT_TYPE } from "@app/shared/constants/common";
import ProductItem from "@app/components/product-item";

function ProductDetail() {
  const classes = useStyles();

  const { subscribeUntilDestroy } = useObservable();

  const { slug } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>(new Product(null));
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const pageRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (slug) {
      subscribeUntilDestroy(
        ProductService.getDetail(slug).pipe(
          switchMap((product) => {
            setProduct(product);
            const options: ProductPaginationOption = {
              page: 1,
              perPage: 4,
              productType: PRODUCT_TYPE.NO_IMAGE_ALL,
            };
            return ProductService.getListByCategory(
              product.category.id,
              options
            );
          })
        ),
        (response: ResponseResult) => {
          const data: Product[] = response.data.map(
            (item: any) => new Product(item)
          );
          setSimilarProducts(data);
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

  const onBtnBuyClick = () => {};

  return (
    <div ref={pageRef}>
      <AppBar />
      <Box paddingTop={2}>
        {product.category?.name && (
          <CustomBreadcrumbs
            navigation={[
              { title: "Trang chủ", linkTo: "/" },
              { title: "Thể loại", linkTo: "/categories" },
              {
                title: product.category.name,
                linkTo: `/categories/${product.category.slug}`,
              },
            ]}
            textPrimary={product.title}
          />
        )}
      </Box>
      <MainSlider />
      <Box
        paddingTop={2}
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
                    value={quantity}
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
                    onClick={onBtnBuyClick}
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
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default ProductDetail;
