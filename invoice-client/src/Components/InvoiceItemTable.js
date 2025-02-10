
import React, { useEffect, useState } from "react";
import { getInvoiceItems } from "../Services/productService"; // Adjust the path to your function

const InvoiceItemTable = ({ invoiceId }) => {
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch invoice items on component mount
    const fetchItems = async () => {
      try {
        const items = await getInvoiceItems(invoiceId);
        setInvoiceItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [invoiceId]);

  if (loading) return <p>Loading invoice items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Invoice Items</h2>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={item.productId}>
              <td>{index + 1}</td>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice.toFixed(2)}</td>
              <td>${item.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemTable;
