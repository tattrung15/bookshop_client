import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  gridItem: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
  },
  orderItemWrapper: {
    padding: "1em",
    border: "1px solid black",
    borderRadius: "0.5em",
    marginTop: "1em",
  },
}));
