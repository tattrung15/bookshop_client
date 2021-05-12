import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { GridList, GridListTile } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "300px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    "&:hover": {
      opacity: 0.75,
    },
    height: "200px",
  },
}));

function ImageGridList(props) {
  const { images } = props;

  const classes = useStyle();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={3}>
        {images.map((item) => (
          <GridListTile key={item.id}>
            <img className={classes.image} src={item.link} alt={item.id} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default ImageGridList;
