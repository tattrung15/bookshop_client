import React from "react";

import "./style.css";

export default function CartItem(props) {
  const { item } = props;

  return (
    <div
      className="col-xl-3 col-lg-3 col-md-3 bcontent"
      style={{ padding: "0 1em", minHeight: "100%" }}
    >
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
            <div>{item.product.price.toLocaleString("en")} đ</div>
            <div className="buy">
              <i className="fas fa-shopping-bag buy-icon"></i>
              <i className="fas fa-heart buy-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
