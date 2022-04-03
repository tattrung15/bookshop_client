import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  image: {
    "&:hover": {
      opacity: 0.75,
    },
    height: "200px",
  },
}));
