import { Link } from "react-router-dom";
import { Breadcrumbs, Box, Typography } from "@material-ui/core";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";

type NavigationItem = {
  title: string;
  linkTo: string;
};

type PropTypes = {
  navigation: NavigationItem[];
  textPrimary: string;
};

function CustomBreadcrumbs(props: PropTypes) {
  const { navigation, textPrimary } = props;
  return (
    <Box paddingX={5.5} maxWidth="930px" style={{ margin: "0 auto" }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={{ background: "#EBE9E9", padding: "0.5em" }}
      >
        {!!navigation.length &&
          navigation.map((item, index) => (
            <Link key={index} color="inherit" to={item.linkTo}>
              {item.title}
            </Link>
          ))}
        <Typography color="textPrimary">{textPrimary}</Typography>
      </Breadcrumbs>
    </Box>
  );
}

export default CustomBreadcrumbs;
