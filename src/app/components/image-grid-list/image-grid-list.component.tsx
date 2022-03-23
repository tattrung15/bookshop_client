import { GridList, GridListTile } from "@material-ui/core";
import { ProductImage } from "@app/models/product-image.model";
import { useStyles } from "./make-style";

type TypeProps = {
  images: ProductImage[];
};

function ImageGridList(props: TypeProps) {
  const { images } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={3}>
        {!!images.length &&
          images.map((item: ProductImage) => (
            <GridListTile key={item.id}>
              <img
                className={classes.image}
                src={item.imageUrl}
                alt={item.imagePublicId}
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}

export default ImageGridList;
