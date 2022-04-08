import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  gridItem: {
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    display: "flex",
    alignItems: "center",
  },
  cartEmptyWrapper: {
    margin: "0 auto",
    marginTop: "1em",
    textAlign: "center",
  },
  totalAmountWrapper: {
    padding: "1em",
    border: "1px solid black",
    borderRadius: "0.5em",
    marginTop: "1em",
  },
}));
