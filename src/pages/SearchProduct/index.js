import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { fetchSearchProductImages } from "../../api/productImageService";

import CardItem from "../../components/CardItem";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchProduct() {
  const classes = useStyles();

  let query = useQuery();

  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    fetchSearchProductImages(query.get("keyword"))
      .then((data) => {
        setProductImages(data);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("keyword")]);

  return (
    <>
      <Box
        paddingX={5.5}
        maxWidth="930px"
        style={{ margin: "0 auto", marginTop: "2em" }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          style={{ background: "#EBE9E9", padding: "0.5em" }}
        >
          <Link color="inherit" to="/">
            Trang chủ
          </Link>
          <Typography color="textPrimary">Tìm kiếm</Typography>
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
            {productImages.length !== 0 && (
              <Box
                style={{
                  display: "flex",
                  margin: "0 auto",
                  marginBottom: "1em",
                }}
              >
                <span>Kết quả tìm kiếm</span>
                <Typography
                  style={{ margin: "auto 0.2em", fontWeight: "bolder" }}
                >
                  {query.get("keyword")}
                </Typography>
              </Box>
            )}
            <Grid container spacing={1}>
              {productImages.length !== 0 &&
                productImages.slice(0, 20).map((val, index) => (
                  <Grid key={index} item xs={6} sm={3}>
                    <CardItem item={val} />
                  </Grid>
                ))}

              {productImages.length === 0 && (
                <Box style={{ display: "flex", margin: "0 auto" }}>
                  <span>Chúng tôi không tìm thấy sản phẩm</span>
                  <Typography
                    style={{ margin: "auto 0.2em", fontWeight: "bolder" }}
                  >
                    {query.get("keyword")}
                  </Typography>
                  <span>nào</span>
                </Box>
              )}
            </Grid>
            {productImages.length !== 0 && (
              <Box style={{ textAlign: "center", marginTop: "1em" }}>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  <Button variant="contained">Trang chủ</Button>
                </Link>
              </Box>
            )}
          </div>
        </Box>
      </Box>
      <Box marginTop={5}></Box>
    </>
  );
}

export default SearchProduct;
