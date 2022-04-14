import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
    width: "70%",
  },
  dialogTitle: {
    paddingRight: "0px",
    padding: "0px 24px",
  },
}));
