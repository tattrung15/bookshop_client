import React from "react";

import { Link } from "react-router-dom";

import "./style.css";

export default function CartItem(props) {
  const { item } = props;

  return (
    <>
      <Link
        to={`/products/${item.product.slug}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div
          className="col-xl-3 col-lg-3 col-md-3 bcontent"
          style={{ padding: "0 1em", minHeight: "100%" }}
        >
          <div>
            {/* <Link to={`/products/${item.product.slug}`}> */}
            <span>
              <img src={item.link} alt="" />
            </span>
            {/* </Link> */}
          </div>
          <div className="btitle">
            <div className="name">
              {/* <Link to={`/products/${item.product.slug}`}> */}
              <span>{item.product.title}</span>
              {/* </Link> */}
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
      </Link>
    </>
  );
}
