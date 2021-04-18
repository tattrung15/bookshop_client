import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box } from "@material-ui/core";

import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  footerContainer: {
    display: "flex",
    color: "white",
    paddingBottom: "1.5em",
  },
  footerMenu: {
    listStyle: "none",
  },
  footerMenuItem: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bolder",
    lineHeight: "1.5em",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box marginTop={10} style={{ background: "#3F51B5" }}>
      <Box paddingX={4} maxWidth="930px" style={{ margin: "0 auto" }}>
        <div className={classes.footerContainer}>
          <Grid style={{ width: "50%" }}>
            <Box>
              <ul className={classes.footerMenu}>
                <li>
                  <Link to="" className={classes.footerMenuItem}>
                    GIỚI THIỆU
                  </Link>
                </li>
                <li>
                  <Link to="" className={classes.footerMenuItem}>
                    SÁCH
                  </Link>
                </li>
                <li>
                  <Link to="" className={classes.footerMenuItem}>
                    TIN TỨC
                  </Link>
                </li>
                <li>
                  <Link to="" className={classes.footerMenuItem}>
                    KHUYẾN MÃI
                  </Link>
                </li>
                <li>
                  <Link to="" className={classes.footerMenuItem}>
                    LIÊN HỆ
                  </Link>
                </li>
              </ul>
              <Box style={{ marginLeft: "2em" }}>
                <TwitterIcon
                  fontSize="large"
                  style={{ color: "white", margin: "0 0.2em" }}
                />
                <FacebookIcon
                  fontSize="large"
                  style={{ color: "white", margin: "0 0.2em" }}
                />
                <InstagramIcon
                  fontSize="large"
                  style={{ color: "white", margin: "0 0.2em" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid style={{ width: "50%" }}>
            <Box style={{ textAlign: "center" }}>
              <h1>BOOKSHOP</h1>
              <Box style={{ marginTop: "5em" }}>
                <Button style={{ marginRight: "1em" }} variant="contained">
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Đăng nhập
                  </Link>
                </Button>
                <Button style={{ marginRight: "1em" }} variant="contained">
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Đăng ký
                  </Link>
                </Button>
              </Box>
            </Box>
          </Grid>
        </div>
      </Box>
    </Box>
  );
}
