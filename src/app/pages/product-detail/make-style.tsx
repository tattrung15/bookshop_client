import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    width: "100%",
    height: "500px",
  },
  showMoreBox: {
    textAlign: "center",
    marginTop: "1em",
  },
  showMoreLink: {
    color: "black",
    textDecoration: "none",
  },
  btnAddToCart: {
    marginTop: "0.5em",
    marginBottom: "1em",
    padding: "0.5em 1em",
  },
}));
