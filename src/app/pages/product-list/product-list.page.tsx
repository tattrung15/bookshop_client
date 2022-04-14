import React, { createRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Helmet } from "react-helmet-async";
import { switchMap } from "rxjs/operators";
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
import {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import { DEFAULT_PAGINATION_OPTION } from "@app/shared/constants/common";
import CategoryService from "@app/services/http/category.service";
import { Category } from "@app/models/category.model";

function ProductList() {
  const classes = useStyles();

  const location = useLocation();
  const { subscribeUntilDestroy } = useObservable();
  const query = new URLSearchParams(location.search);

  const [title, setTitle] = useState("");
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [textBreadcrumbs, setTextBreadcrumbs] = useState("");
  const [pagination, setPagination] = useState(() => {
    const options: ProductPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      perPage: 24,
    };
    return options;
  });

  const pageRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (query.get("category")) {
      const options: PaginationOption = {
        perPage: 24,
        page: pagination.page,
      };
      const category = query.get("category") || "";
      subscribeUntilDestroy(
        CategoryService.getDetail(category).pipe(
          switchMap((data: Category) => {
            if (data.id) {
              setTextBreadcrumbs(data.name);
            }

            return ProductService.getListByCategory(category, options);
          })
        ),
        (response: ResponseResult) => {
          const data = response.data as Product[];
          const total = response.pagination?.total || 0;
          const perPage = response.pagination?.perPage || 1;
          setProducts(data);
          setNumberOfPage(Math.ceil(total / perPage));
        }
      );
    } else {
      const search = query.get("search");
      const mode = query.get("mode");

      if (mode === "top-selling") {
        setTitle("Sản phẩm bán chạy");
        setTextBreadcrumbs("Sản phẩm bán chạy");
      } else if (search) {
        setTitle("Tìm kiếm sản phẩm");
        setTextBreadcrumbs("Tìm kiếm sản phẩm");
      } else {
        setTitle("Danh sách sản phẩm");
        setTextBreadcrumbs("Danh sách sản phẩm");
      }

      const options: ProductPaginationOption = {
        ...pagination,
        ...(mode === "top-selling" && { sort: "-quantityPurchased" }),
        ...(search && { like: { title: search } }),
      };
      subscribeUntilDestroy(
        ProductService.getList(options),
        (response: ResponseResult) => {
          const data = response.data as Product[];
          const total = response.pagination?.total || 0;
          const perPage = response.pagination?.perPage || 1;
          setProducts(data);
          setNumberOfPage(Math.ceil(total / perPage));
        }
      );
    }

    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, query.get("search"), query.get("category")]);

  const onPageChange = (event: React.ChangeEvent<any>, page: number) => {
    const options: ProductPaginationOption = {
      ...pagination,
      page,
    };
    setPagination(options);
  };

  return (
    <div ref={pageRef}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <AppBar />
      <Box paddingTop={2}>
        <CustomBreadcrumbs
          navigation={
            !query.get("category")
              ? [{ title: "Trang chủ", linkTo: "/" }]
              : [
                  { title: "Trang chủ", linkTo: "/" },
                  { title: "Thể loại", linkTo: "/categories" },
                ]
          }
          textPrimary={textBreadcrumbs}
        />
      </Box>
      <MainSlider />
      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        {!!products.length && (
          <Box marginTop={5}>
            <div className={classes.rootItem}>
              <Grid container spacing={1}>
                {!!products.length &&
                  products.map((item, index) => (
                    <Grid key={index} item xs={6} sm={3}>
                      <ProductItem item={item} />
                    </Grid>
                  ))}
              </Grid>
            </div>
          </Box>
        )}
        {!products.length && query.get("search") && (
          <Box style={{ textAlign: "center", marginTop: "5em" }}>
            <Typography
              variant="h5"
              style={{ margin: "auto 0.2em", fontWeight: "bolder" }}
            >
              {"KHÔNG TÌM THẤY KẾT QUẢ TÌM KIẾM PHÙ HỢP CHO: " +
                query.get("search")}
            </Typography>
          </Box>
        )}
        {!products.length && query.get("category") && (
          <Box style={{ textAlign: "center", marginTop: "5em" }}>
            <Typography
              variant="h5"
              style={{ margin: "auto 0.2em", fontWeight: "bolder" }}
            >
              {"KHÔNG CÓ SẢN PHẨM"}
            </Typography>
          </Box>
        )}
      </Box>
      {!!products.length && (
        <Box marginTop={5}>
          <Pagination
            count={numberOfPage}
            onChange={onPageChange}
            page={pagination.page}
            color="primary"
            style={{ justifyContent: "center", display: "flex" }}
          />
        </Box>
      )}
      <Footer />
    </div>
  );
}

export default ProductList;
