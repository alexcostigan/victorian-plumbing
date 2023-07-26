import React from "react";
import { Rating } from "@mui/material";
import "./ProductCard.css";

export const ProductCard = (data) => {
  return (
    <div className="card">
      <div className="imgbox">
        <img
          src={data.data.image.url}
          alt={data.data.image.attributes.imageAltText}
        />
      </div>

      <div className="content">
        <h3>{data.data.productName}</h3>
        <img className="brand"
          src={data.data.brand.brandImage.url}
          alt={data.data.brand.brandImage.attributes.imageAltText}
        />
        <div className="priceContainer">
          <h2 className="price">£{data.data.price.priceIncTax}</h2>
        {data.data.price.isOnPromotion && (
          <h2 className="product-sale-price">
            Was £{data.data.price.wasPriceIncTax}
          </h2>
        )}
        </div>
        
        {data.data.reviewsCount > 0 && (
          <div className="star-rating">
            <Rating
              name={`star-rating-${data.data.productId}`}
              value={data.data.averageRating}
              readOnly
              precision={0.5}
            />
            <span>({data.data.reviewsCount})</span>
          </div>
        )}
      </div>
    </div>
  );
};
