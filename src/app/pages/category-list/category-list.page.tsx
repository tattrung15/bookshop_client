import { Helmet } from "react-helmet-async";
import AppBar from "@app/components/app-bar";
import { Box, Grid } from "@material-ui/core";
import CustomBreadcrumbs from "@app/components/custom-breadcrumbs";
import CategoryItem from "@app/components/category-item";
import { useStyles } from "./make-style";

function CategoryList() {
  const classes = useStyles();

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
              <Grid item xs={6} sm={6}>
                <CategoryItem />
              </Grid>
              <Grid item xs={6} sm={6}>
                <CategoryItem />
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default CategoryList;
