import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";

export const PaginationComponent = ({ currentPage, onPageChange, totalPages }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  const handlePageChange = (event, pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPageNumber(pageNumber);
      onPageChange(pageNumber);
    }
  };

  return (
    <Pagination
      page={currentPageNumber}
      count={totalPages}
      onChange={handlePageChange}
      shape="rounded"
      color="primary"
      style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    />
  );
};

