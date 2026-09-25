import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ slug, name, subtitle, highlights, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className="subtitle">{subtitle}</p>
      <p className="highlights">{highlights.join(' / ')}</p>
      <Link to={`/product/${slug}`} className="discover-link">
        Discover
      </Link>
    </div>
  );
}

export default ProductCard;
