import { ImageList, ImageListItem } from "@material-ui/core";
import { ProductImage } from "@app/models/product-image.model";
import { useStyles } from "./make-style";
import { buildImageSrc } from "@app/shared/helpers/helpers";

type PropTypes = {
  images: ProductImage[];
};

function ImageGridList(props: PropTypes) {
  const { images } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={200} className={classes.gridList} cols={3}>
        {!!images.length &&
          images.map((item: ProductImage, index: number) => {
            return (
              <ImageListItem key={index}>
                <img
                  className={classes.image}
                  src={buildImageSrc(item.imageUrl)}
                  alt={item.imagePublicId}
                />
              </ImageListItem>
            );
          })}
      </ImageList>
    </div>
  );
}

export default ImageGridList;
