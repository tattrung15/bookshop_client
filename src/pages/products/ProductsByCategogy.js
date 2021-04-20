import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { fetchProductsBySlugOfCategory } from "../../api/categoryService";

import Footer from "../../components/Footer";
import CartItem from "../../components/CartItem";
import CategoryHeader from "../../components/CategoryHeader";

const useStyles = makeStyles((theme) => ({
  rootItem: {
    flexGrow: 1,
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
    textTransform: "uppercase",
    "&:hover": {
      color: "red",
    },
  },
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ProductsByCategogy() {
  const classes = useStyles();

  let { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(null);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (slug !== "sach-moi") {
      fetchProductsBySlugOfCategory(slug, currentPage)
        .then((data) => {
          setProductImages(data.data);
          setTotalOfPage(data.totalOfPage);
          setCategory(data.data[0].product.category.name);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCategory("Sách mới");
      fetchProductsBySlugOfCategory("sach-moi", currentPage)
        .then((data) => {
          setProductImages(data.data);
          setTotalOfPage(data.totalOfPage);
          setCategory("Sách mới");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage, slug]);

  const pageOnChange = (obj, page) => {
    setCurrentPage(page);
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
          <Typography color="textPrimary">{category}</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        marginTop={2}
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto" }}
      >
        <Box marginTop={5}>
          <div className={classes.rootItem}>
            <Grid container spacing={1}>
              {productImages &&
                productImages.map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CartItem item={val} />
                  </Grid>
                ))}
            </Grid>
          </div>
        </Box>
      </Box>
      <Box marginTop={5}>
        <Pagination
          count={totalOfPage}
          onChange={pageOnChange}
          page={currentPage}
          color="primary"
          style={{ justifyContent: "center", display: "flex" }}
        />
      </Box>
      <Footer />
    </>
  );
}

export default ProductsByCategogy;
