import { imageCategory } from "@app/shared/constants/common";
import "./category-item.style.scss";

function CategoryItem() {
  return (
    <div className="category-item-wrapper">
      <div className="category-item">
        <img src={imageCategory} alt="" className="category-image" />
        <div className="category-right">
          <div className="category-text-wrapper">
            <span className="category-text">TitleTitleT itleTitleTitle</span>
          </div>
          <div className="category-description-wrapper">
            <span className="category-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
