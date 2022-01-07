import { makeStyles, Theme } from "@material-ui/core/styles";

import { bannerDangKy } from "@app/shared/constants/common";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bannerEmail: {
    backgroundImage: `url(${bannerDangKy})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    marginBottom: "4%",
  },
  emaill: {
    textAlign: "center",
  },
  emaillP: {
    fontWeight: "bold",
    color: "white",
    fontSize: "20px",
    paddingTop: "2%",
  },
  emaillForm: {
    paddingBottom: "3%",
  },
  emaillFormInput: {
    width: "19%",
    border: "none",
    marginRight: "1em",
    padding: "0.6em",
  },
  banneDoremonImg: {
    height: "50%",
    width: "100%",
    marginTop: "2em",
  },
  banneWingsBooksImg: {
    height: "50%",
    width: "100%",
    marginBottom: "1em",
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
