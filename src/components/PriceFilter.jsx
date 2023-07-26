import React, { useState } from "react";
import { Slider, Button, TextField } from "@mui/material";
import "./PriceFilter.css";

export const PriceFilter = ({ title, minPrice, maxPrice, onPriceChange }) => {
  const [minInput, setMinInput] = useState(minPrice);
  const [maxInput, setMaxInput] = useState(maxPrice);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinInput(parseInt(value));
    } else if (name === "maxPrice") {
      setMaxInput(parseInt(value));
    }
  };

  const handleSliderChange = (event, newValue) => {
    setMinInput(newValue[0]);
    setMaxInput(newValue[1]);
  };

  const handleBlur = () => {
    if (minInput > maxInput) {
      setMinInput(maxInput);
    }
    if (maxInput < minInput) {
      setMaxInput(minInput);
    }
  };

  const handleClear = () => {
    setMinInput(0);
    setMaxInput(0);
  };

  const handleSubmit = () => {
    onPriceChange({ min: minInput, max: maxInput });
  };

  return (
    <div className="price-filter-container">
      <h2 className="filter-title">Filter Options</h2>
      <div className="price-filter-controls">
        <div className="price-filter-top">
          <div className="inputBox">
            <div className="minInput">
              <TextField
                type="number"
                name="minPrice"
                value={minInput || ""}
                placeholder="Min"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{ style: { width: "100px" } }}
              />
            </div>
            <h5>to</h5>
            <div className="maxInput">
              <TextField
                type="number"
                name="maxPrice"
                value={maxInput || ""}
                placeholder="Max"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{ style: { width: "100px" } }}
              />
            </div>
          </div>
        </div>
        <Slider
          value={[minInput, maxInput]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={1}
          className="slider"
        />
        <div className="buttons">
          <Button variant="contained" onClick={handleSubmit}>
            Go
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
