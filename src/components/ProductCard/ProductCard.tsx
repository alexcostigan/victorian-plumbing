import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './ProductCard.css';

interface ProductCardProps {
  name: string;
  img: string;
  price: number;
  wasPrice?: number;
  isOnPromotion: boolean;
  href: string;
  score: number;
  reviewsCount: number;
  stockStatus: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, img, price, wasPrice, isOnPromotion, href, score, reviewsCount, stockStatus }) => {
  const starRating = Math.min(Math.max((score / 10) * 5, 0), 5);

  return (
    <Card className="product-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '8px' }}>
      <CardMedia
        component="img"
        alt={name}
        image={img}
        title={name}
        sx={{ height: 300, objectFit: 'contain', margin: 'auto', padding: '8px'}}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <div className="product-card-rating">
          <span className="star-rating">{'★'.repeat(Math.round(starRating))}{'☆'.repeat(5 - Math.round(starRating))}</span>
          <span className="reviews-count">({reviewsCount} reviews)</span>
        </div>
        <div className="product-card-price">
          {isOnPromotion && wasPrice && (
            <span className="was-price" style={{ color: 'red', textDecoration: 'line-through' }}>
              £{wasPrice.toFixed(2)}
            </span>
          )}
          <span className="current-price">
            £{price.toFixed(2)}
          </span>
        </div>
        <Typography variant="h6" color={stockStatus === 'In Stock' ? 'green' : 'red'}>
          {stockStatus}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" href={`https://www.victorianplumbing.co.uk/${href}`} target="_blank" fullWidth>
          View Product
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;