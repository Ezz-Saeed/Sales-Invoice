import React, { useEffect, useState } from 'react';
import {fetchProducts, addToCart, activeInvoiceId} from '../Services/productService'

const ProductList = () => {
  const [invoiceId, setInvoiceId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const id = await activeInvoiceId();
        setInvoiceId(id);
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
              <p className="card-text">Quantity: {product.stockQuantity}</p>
              <p className="card-price">Pricce: ${product.price}</p>
            </div>
            <div className="card-footer">
              <button onClick={()=>
              addToCart({productId:product.id, invoiceId:invoiceId, unitPrice: product.price, quantity:1})} 
              className='btn btn-primary'>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
  


export default ProductList;
