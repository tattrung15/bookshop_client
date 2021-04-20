import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { makeStyles, Typography } from "@material-ui/core";

import { fetchAllCategories } from "../../api/categoryService";

const useStyles = makeStyles((theme) => ({
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
}));

function CategoryHeader() {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        THỂ LOẠI
      </Typography>
      <ul className={classes.menuTopUl}>
        {categories &&
          categories.map((item) => (
            <li className={classes.menuTopUlLi} key={item.id}>
              <Link
                to={`/categories/${item.slug}`}
                className={classes.menuTopUlLiLink}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default CategoryHeader;
