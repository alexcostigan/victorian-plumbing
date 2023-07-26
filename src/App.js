import React, { useState } from "react";
import Select from "react-select";
import {
  ProductCard,
  PaginationComponent,
  PriceFilter,
} from "./components/index";
import { useProductData } from "./hooks/index";
import "./App.css";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { products, currentProducts, setCurrentProducts } = useProductData();

  const totalProducts = products ? products.products.length : 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const sortProductOptions = [
    { value: "recommended", label: "Sort by Recommended" },
    { value: "priceLowToHigh", label: "Price: Low - High" },
    { value: "priceHighToLow", label: "Price: High - Low" },
    { value: "largestDiscount", label: "Largest Discount" },
  ];

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.value === "recommended") {
      setCurrentProducts({
        ...currentProducts,
        sort: 1,
      });
    } else if (selectedOption.value === "priceLowToHigh") {
      setCurrentProducts({
        ...currentProducts,
        sort: 2,
      });
    } else if (selectedOption.value === "priceHighToLow") {
      setCurrentProducts({
        ...currentProducts,
        sort: 3,
      });
    } else if (selectedOption.value === "largestDiscount") {
      setCurrentProducts({
        ...currentProducts,
        sort: 4,
      });
    } else {
      return null;
    }
  };

  const handlePriceChange = ({ min, max }) => {
    if (min !== null && max !== null) {
      setMinPrice(min);
      setMaxPrice(max);
    }

    setCurrentProducts({
      ...currentProducts,
      facets: {
        prices: [
          {
            value: {
              gte: min,
              lte: max,
            },
          },
        ],
      },
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentProducts({
      ...currentProducts,
      pageNumber: pageNumber,
      pageSize: productsPerPage,
    });
  };

  return (
    <div className="container">
      <h3 className="title">Victorian Plumbing</h3>
      <div className="sortBy-productCount">
        <div className="sort-by">
          <Select
            options={sortProductOptions}
            value={selectedOption}
            onChange={handleOptionChange}
            placeholder="Sort by..."
          />
        </div>
        <div className="productCount">
          Products: {products && products.pagination.total}
        </div>
      </div>
      <div className="full-product-filter">
        <div className="filter">
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />
        </div>
        <div className="product-grid">
          {products === undefined ? (
            <div>Loading...</div>
          ) : (
            products.products
              .slice(
                (currentPage - 1) * productsPerPage,
                currentPage * productsPerPage
              )
              .map((card, index) => <ProductCard key={index} data={card} />)
          )}
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default App;
