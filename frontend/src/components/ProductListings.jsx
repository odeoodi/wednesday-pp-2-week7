import ProductListing from "./ProductListing";
import { useEffect, useState } from "react";



const ProductListings = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try{
      const response = await fetch('/api/products');
      if(!response.ok){
        throw new Error('Error fetching data');
      }else{
        const data = await response.json();
        setProducts(data);
      }
    }catch(err){
      console.error('Error fetching products', err);
    }
  }

  useEffect(()=> {
      fetchProducts();
    },[]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductListing key={product.id} product={product}/>
      ))}
      
      
    </div>
  );
};

export default ProductListings;
