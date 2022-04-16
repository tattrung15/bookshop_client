import { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Helmet } from "react-helmet-async";
import AppBar from "@app/components/app-bar";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import CategoryItem from "@app/components/category-item";
import useObservable from "@core/hooks/use-observable.hook";
import { Category } from "@app/models/category.model";
import CategoryService, {
  CategoryPaginationOption,
} from "@app/services/http/category.service";
import { DEFAULT_PAGINATION_OPTION } from "@app/shared/constants/common";
import { ResponseResult } from "@core/services/http/http.service";
import Footer from "@app/components/footer";
import { useStyles } from "./make-style";

function CategoryList() {
  const classes = useStyles();

  const { subscribeUntilDestroy } = useObservable();

  const [numberOfPage, setNumberOfPage] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState(() => {
    const options: CategoryPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      perPage: 32,
    };
    return options;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      CategoryService.getList(pagination),
      (response: ResponseResult) => {
        const data = response.data as Category[];
        const total = response.pagination?.total || 0;
        const perPage = response.pagination?.perPage || 1;
        setCategories(data);
        setNumberOfPage(Math.ceil(total / perPage));
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const onPageChange = (event: React.ChangeEvent<any>, page: number) => {
    const options: CategoryPaginationOption = {
      ...pagination,
      page,
    };
    setPagination(options);
  };

  return (
    <>
      <Helmet>
        <title>Danh sách thể loại</title>
      </Helmet>
      <AppBar />
      <Box paddingTop={2}>
        <CustomBreadcrumbs
          navigation={[{ title: "Trang chủ", linkTo: "/" }]}
          textPrimary="Danh sách thể loại"
        />
      </Box>
      <Box
        marginTop={2}
        paddingX={2}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5}>
          <div className={classes.rootItem}>
            <Grid container spacing={4}>
              {!!categories.length &&
                categories.map((item, index) => (
                  <Grid key={index} item xs={6} sm={6}>
                    <CategoryItem item={item} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>
      {!!categories.length && (
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
    </>
  );
}

export default CategoryList;
