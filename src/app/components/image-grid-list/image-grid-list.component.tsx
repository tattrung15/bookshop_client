import { ImageList, ImageListItem } from "@material-ui/core";
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
      <ImageList rowHeight={200} className={classes.gridList} cols={3}>
        {!!images.length &&
          images.map((item: ProductImage) => {
            const baseUrl = new URL(process.env.REACT_APP_BASE_API_URL || "");
            const srcImage = item.imageUrl.startsWith("http")
              ? item.imageUrl
              : `${baseUrl.origin}${item.imageUrl}`;
            return (
              <ImageListItem key={item.id}>
                <img
                  className={classes.image}
                  src={srcImage}
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
