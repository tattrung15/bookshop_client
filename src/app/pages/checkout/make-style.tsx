import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  titleGradient: {
    display: "flex",
    padding: "0.5em 0",
    backgroundImage: "linear-gradient(90deg,#ebf8ff,#fff)",
  },
  changeProfileLink: {
    display: "flex",
    padding: "0.5em 0.5em",
    color: "#4a90e2",
    textDecoration: "none",
  },
  blockShadow: {
    boxShadow: "0px 0px 2px 1px #888888",
  },
  icon: {
    margin: "0 0.5em",
  },
  paddingFlexCenter: {
    display: "flex",
    padding: "1em",
    alignItems: "center",
  },
}));
