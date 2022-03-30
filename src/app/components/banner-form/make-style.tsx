import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  image: {
    "&:hover": {
      opacity: 0.75,
    },
    height: "200px",
  },
}));
