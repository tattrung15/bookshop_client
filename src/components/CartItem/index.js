import React from "react";
import "./style.css";

export default function CartItem(props) {
  const { item } = props;

  return (
    <div className="col-xl-3 col-lg-3 col-md-3 bcontent">
      <div>
        <a href="/">
          <img src={item.link} alt="" />
        </a>
      </div>
      <div className="btitle">
        <div className="name">
          <a href="/">{item.product.title}</a>
          <div className="creator">{item.product.author}</div>
          <div className="price">
            <span>{item.product.price.toLocaleString("en")} đ</span>
            <span className="buy">
              <i className="fas fa-shopping-bag buy-icon"></i>
              <i className="fas fa-heart buy-icon"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
