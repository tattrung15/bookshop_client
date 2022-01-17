import { Link } from "react-router-dom";

import { Grid, Button, Box } from "@material-ui/core";

import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

import { useStyles } from "./make-style";

export default function Footer() {
  const classes = useStyles();

  return (
    <Box marginTop={10} className="bs-bg-primary">
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
