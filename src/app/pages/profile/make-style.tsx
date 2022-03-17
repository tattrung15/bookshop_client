import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    maxWidth: "1200px",
  },
  wrapBreadcrumb: {
    margin: "0 auto",
    maxWidth: "930px",
  },
  breadcrumb: {
    background: "#EBE9E9",
    padding: "0.5em",
  },
  itemNavLink: {
    marginTop: "1em",
  },
  navLink: {
    textDecoration: "none",
    color: "black",
  },
  menuLeft: {
    marginTop: "1em",
    padding: "1em 1em 1em 1em",
  },
  menuIcon: {
    fontSize: "larger",
    marginRight: "0.5em",
  },
  typographyBolder: {
    fontWeight: "bolder",
  },
  customWidth: {
    maxWidth: 250,
  },
}));
