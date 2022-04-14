import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
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
