import { useLayoutEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import AppBar from "@app/components/app-bar";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import MainSlider from "@app/components/main-slider";
import { useStyles } from "./make-style";
import Footer from "@app/components/footer";
import { Product } from "@app/models/product.model";
import ProductItem from "@app/components/product-item";
import useObservable from "@core/hooks/use-observable.hook";
import ProductService, {
  ProductPaginationOption,
} from "@app/services/http/product.service";
import { DEFAULT_PAGINATION_OPTION } from "@app/shared/constants/common";
import ViewService from "@app/services/view.service";

function ProductViewed() {
  const classes = useStyles();

  const { subscribeUntilDestroy } = useObservable();

  const [isTheLast, setIsTheLast] = useState(false);
  const [lastViewProducts, setLastViewProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState(() => {
    const options: ProductPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      perPage: 24,
    };
    return options;
  });

  useLayoutEffect(() => {
    const lastViewIds = ViewService.getLastView();
    if (!!lastViewIds.length) {
      const options: ProductPaginationOption = {
        page: 1,
        perPage: pagination.perPage,
        ids: lastViewIds,
      };
      subscribeUntilDestroy(ProductService.getList(options), (response) => {
        const data: Product[] = response.data.map(
          (item: any) => new Product(item)
        );
        setLastViewProducts(data);

        if (data.length < pagination.perPage) {
          setIsTheLast(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const onShowMoreClick = () => {
    setPagination((state) => {
      return {
        ...pagination,
        perPage: state.perPage + 4,
      };
    });
  };

  return (
    <>
      <Helmet>
        <title>Sản phẩm đã xem</title>
      </Helmet>
      <AppBar />
      <Box paddingTop={2}>
        <CustomBreadcrumbs
          navigation={[{ title: "Trang chủ", linkTo: "/" }]}
          textPrimary="Sản phẩm đã xem"
        />
      </Box>
      <MainSlider />
      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        {!!lastViewProducts.length && (
          <Box marginTop={5}>
            <div className={classes.rootItem}>
              <Grid container spacing={1}>
                {!!lastViewProducts.length &&
                  lastViewProducts.map((item, index) => (
                    <Grid key={index} item xs={6} sm={3}>
                      <ProductItem item={item} />
                    </Grid>
                  ))}
              </Grid>
            </div>

            {!isTheLast && (
              <Box className={classes.showMoreBox}>
                <Button onClick={onShowMoreClick} variant="contained">
                  Xem thêm
                </Button>
              </Box>
            )}
          </Box>
        )}
        {!lastViewProducts.length && (
          <Box style={{ textAlign: "center", marginTop: "5em" }}>
            <Typography
              variant="h5"
              style={{ margin: "auto 0.2em", fontWeight: "bolder" }}
            >
              BẠN CHƯA XEM SẢN PHẨM NÀO
            </Typography>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default ProductViewed;
