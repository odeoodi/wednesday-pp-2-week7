import { Link } from "react-router-dom";

const ProductListing = ({product}) => {
  return (
    <div className="product-preview">
      <h2>{product.title}</h2>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Stock Quantity: {product.stockQuantity}</p>
      <p>Supplier Name: {product.supplier.name}</p>
      <p>Email: {product.supplier.contactEmail}</p>
      <p>Phone: {product.supplier.contactPhone}</p>
      <p>Rating: {product.supplier.rating}</p>
      <Link to={`/products/${product._id}`} >
      <button>Open product</button>
      </Link>
    </div>
  );
};

export default ProductListing;
