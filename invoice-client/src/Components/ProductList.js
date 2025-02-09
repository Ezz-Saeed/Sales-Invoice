import React, { useEffect, useState } from 'react';
import {fetchProducts} from '../Services/productService'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        // const response = await fetch('http://localhost:5024/api/products/getProducts')
        const data = await fetchProducts()
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>
      <div className="d-flex justify-content-between">
        {products.map((product) => (
          <div key={product.id} className="card mb-4" style={{ width: '18rem' }}>
            <img src={product.imageUrl} alt={product.name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
  


export default ProductList;
