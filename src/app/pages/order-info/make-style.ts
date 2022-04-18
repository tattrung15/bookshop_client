import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    padding: "0.5em",
  },
  title: {
    fontWeight: "bolder",
  },
  navLink: {
    padding: "0.5em 1em",
    color: "black",
    textDecoration: "none",
  },
  listNavLink: {
    listStyle: "none",
    display: "flex",
    padding: "0 0 0.5em 0",
    borderBottom: "1px solid #BDBDBD",
  },
}));
