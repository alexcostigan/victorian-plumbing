import { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import './Filter.css';

interface FacetOption {
  identifier: string;
  value: string;
  displayValue: string;
  productCount: number;
}

interface Facet {
  identifier: string;
  displayName: string;
  options: FacetOption[];
}

interface FilterProps {
  facets: Facet[];
  requestFacets: Record<string, FacetOption[]>;
  setRequestFacets: (facets: Record<string, FacetOption[]>) => void;
}

const Filter: React.FC<FilterProps> = ({ facets, requestFacets, setRequestFacets }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (
    facetIdentifier: string,
    optionIdentifier: string,
    optionValue: string,
    displayValue: string,
    productCount: number,
    checked: boolean
  ) => {
    if (checked) {
      addFacet(facetIdentifier, optionIdentifier, optionValue, displayValue, productCount);
    } else {
      removeFacet(facetIdentifier, optionIdentifier);
    }
  };

  const addFacet = (facetIdentifier: string, identifier: string, value: string, displayValue: string, productCount: number) => {
    const newFacet = { ...requestFacets };
    const newOption: FacetOption = { identifier, value, displayValue, productCount };
    
    if (!newFacet[facetIdentifier]) {
      newFacet[facetIdentifier] = [newOption];
    } else {
      newFacet[facetIdentifier].push(newOption);
    }
    setRequestFacets(newFacet);
  };

  const removeFacet = (facetIdentifier: string, identifier: string) => {
    const newFacet = { ...requestFacets };
    newFacet[facetIdentifier] = newFacet[facetIdentifier].filter((option) => option.identifier !== identifier);
    if (newFacet[facetIdentifier].length === 0) {
      delete newFacet[facetIdentifier];
    }
    setRequestFacets(newFacet);
  };

  const isOptionSelected = (facetIdentifier: string, optionIdentifier: string) => {
    return requestFacets[facetIdentifier]?.some(option => option.identifier === optionIdentifier);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Filters
      </Button>

      <Drawer anchor="left" open={show} onClose={handleClose} PaperProps={{ sx: { width: 300 } }}>
        <div className="filter-header">
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Filters
          </Typography>
        </div>
        <div className="filter-body">
          {facets.map((facet) => (
            <div className="products-filter-container" key={facet.identifier}>
              <Typography variant="h6">{facet.displayName}</Typography>
              {facet.options.map((option) => (
                <label key={option.identifier}>
                  <input
                    type="checkbox"
                    checked={isOptionSelected(facet.identifier, option.identifier)}
                    onChange={(e) =>
                      handleChange(
                        facet.identifier,
                        option.identifier,
                        option.value,
                        option.displayValue,
                        option.productCount,
                        e.target.checked
                      )
                    }
                  />
                  {option.displayValue} ({option.productCount})
                </label>
              ))}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Filter;