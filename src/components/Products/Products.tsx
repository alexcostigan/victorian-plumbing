import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils/api';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import ProductCard from '../ProductCard/ProductCard';
import FilterMenu from '../Filter/Filter';
import './Products.css';
import PaginationBar from '../Pagination/Pagination';

interface Product {
  productName: string;
  image: {
    url: string;
  };
  price: {
    priceIncTax: number;
    wasPriceIncTax?: number;
    isOnPromotion: boolean;
  };
  slug: string;
  score: number;
  reviewsCount: number;
  stockStatus: { status: string }
}

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

interface SortOption {
  value: number;
  display: string;
}

interface ProductsProps {
  query: string;
}

const Products: React.FC<ProductsProps> = ({ query }) => {
  const [result, setResult] = useState<{ products: Product[] } | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [facets, setFacets] = useState<Facet[] | null>(null);
  const [requestFacets, setRequestFacets] = useState<Record<string, FacetOption[]>>({});
  const [sort, setSort] = useState<SortOption>({ value: 1, display: 'Recommended' });

  useEffect(() => {
    fetchData({
      setData: setResult,
      setFacets: setFacets,
      setTotalPages: setTotalPages,
      query: query,
      pageNumber: pageNumber,
      size: 0,
      sort: sort.value,
      facets: requestFacets,
    });
  }, [requestFacets, pageNumber, query, sort]);

  const sortBy: SortOption[] = [
    { value: 1, display: 'Recommended' },
    { value: 2, display: 'Price Low to High' },
    { value: 3, display: 'Price High to Low' },
    { value: 4, display: 'Largest Discount' },
  ];

  const handleSetFilter = (sortItem: SortOption) => {
    setSort(sortItem);
    setPageNumber(1);
  };

  if (!result) {
    return (
      <Box className="products-spinner-container">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box className="products-sortfilter-container">
        <FilterMenu
          facets={facets!}
          requestFacets={requestFacets}
          setRequestFacets={setRequestFacets}
        />
        <FormControl className="products-sortfilter" variant="outlined">
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sort.value}
            onChange={(e) => handleSetFilter(sortBy.find(s => s.value === e.target.value) as SortOption)}
            label="Sort By"
          >
            {sortBy.map((sortItem, index) => (
              <MenuItem key={index} value={sortItem.value}>
                {sortItem.display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3} className="products-card-container">
        {result.products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard
              name={product.productName}
              img={product.image.url}
              price={product.price.priceIncTax}
              wasPrice={product.price.wasPriceIncTax}
              isOnPromotion={product.price.isOnPromotion}
              href={product.slug}
              score={product.score}
              reviewsCount={product.reviewsCount}
              stockStatus={product.stockStatus.status === 'G' ? 'In Stock' : 'Out of Stock'}
            />
          </Grid>
        ))}
      </Grid>
      <PaginationBar
        currentPage={pageNumber}
        setCurrentPage={setPageNumber}
        totalPages={totalPages}
      />
    </>
  );
};

export default Products;