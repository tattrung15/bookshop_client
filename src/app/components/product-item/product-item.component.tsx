import { Link } from "react-router-dom";
import { Product } from "@app/models/product.model";
import { imageNotFound } from "@app/shared/constants/common";
import "./product-item.style.scss";
import ViewService from "@app/services/view.service";

type TypeProps = {
  item: Product;
};

function ProductItem(props: TypeProps) {
  const { item } = props;

  const baseUrl = new URL(process.env.REACT_APP_BASE_API_URL || "");

  let srcImage = imageNotFound;
  if (item.productImages[0]) {
    srcImage = item.productImages[0]?.imageUrl.startsWith("http")
      ? item.productImages[0]?.imageUrl
      : `${baseUrl.origin}${item.productImages[0].imageUrl}`;
  }

  const onProductItemClick = () => {
    ViewService.addLastView(item.id);
  };

  return (
    <>
      <Link
        to={`/products/${item.slug}`}
        style={{ textDecoration: "none", color: "black" }}
        onClick={onProductItemClick}
      >
        <div
          className="col-xl-3 col-lg-3 col-md-3 bcontent"
          style={{ padding: "0 1em", minHeight: "100%" }}
        >
          <div>
            <span>
              <img src={srcImage} alt={item.title} />
            </span>
          </div>
          <div className="btitle">
            <div className="name">
              <span>{item.title}</span>
              <div className="creator">{item.author}</div>
              <div className="price">
                <div>{item.price.toLocaleString("en")} đ</div>
                <div className="buy">
                  <i className="fas fa-shopping-bag buy-icon"></i>
                  {/* <i className="fas fa-heart buy-icon"></i> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductItem;
