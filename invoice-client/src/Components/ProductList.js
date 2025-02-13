import React, { useEffect, useState } from "react";
import { fetchProducts, addToCart, activeInvoiceId } from "../Services/productService";
import { Toast, ToastContainer } from "react-bootstrap";

const ProductList = () => {
  const [invoiceId, setInvoiceId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const id = await activeInvoiceId();
        setInvoiceId(id);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      productId: product.id,
      invoiceId: invoiceId,
      unitPrice: product.price,
      quantity: 1,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Quantity: {product.stockQuantity}</p>
                <p className="card-price">Price: ${product.price}</p>
              </div>
              <div className="card-footer text-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary w-100"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success">
          <Toast.Body className="text-white">An item has been added!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ProductList;
