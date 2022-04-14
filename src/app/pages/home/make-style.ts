import { makeStyles } from "@material-ui/core/styles";

const bannerProperties = {
  height: "50%",
  width: "100%",
  marginTop: "2em",
};

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  bannerComboImg: {
    ...bannerProperties,
  },
  bannerMangaImg: {
    ...bannerProperties,
  },
  bannerWingsBooksImg: {
    ...bannerProperties,
    marginBottom: "1em",
  },
  showMoreBox: {
    textAlign: "center",
    marginTop: "1em",
  },
  showMoreLink: {
    color: "black",
    textDecoration: "none",
  },
}));
