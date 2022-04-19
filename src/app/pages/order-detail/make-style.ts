import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  orderDetailWrapper: {
    padding: "1em 1em 1em 0",
  },
  orderInfo: {
    border: "1px solid #BDBDBD",
    padding: "0.5em",
  },
  orderItemInfo: {
    marginTop: "1em",
    border: "1px solid #BDBDBD",
    padding: "0.5em",
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
