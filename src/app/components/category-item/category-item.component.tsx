import { Link } from "react-router-dom";
import { imageCategory } from "@app/shared/constants/common";
import { Category } from "@app/models/category.model";
import "./category-item.style.scss";

type PropTypes = {
  item: Category;
};

function CategoryItem(props: PropTypes) {
  const { item } = props;

  return (
    <Link
      to={`/products?category=${item.slug}`}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <div className="category-item-wrapper">
        <div className="category-item">
          <img src={imageCategory} alt="" className="category-image" />
          <div className="category-right">
            <div className="category-text-wrapper">
              <span className="category-text">{item.name}</span>
            </div>
            <div className="category-description-wrapper">
              <span className="category-description">{item.description}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryItem;
