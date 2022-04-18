import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
  },
  orderItemWrapper: {
    border: "1px solid #BDBDBD",
    marginBottom: "0.5em",
  },
  orderItemHeader: {
    background: "#F5F5F5",
    display: "flex",
    padding: "0.5em",
  },
  orderItemLink: {
    textDecoration: "none",
    color: "blue",
  },
  orderItemTitle: {
    fontWeight: "bolder",
    marginLeft: "0.5em",
  },
}));
