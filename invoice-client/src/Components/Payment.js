import React, { useEffect, useState } from "react";
import { activeInvoiceId } from "../Services/productService"; 
import { checkout } from "../Services/productService";
const Payment = () => {
  const [invoiceId, setInvoiceId] = useState(null);
  const [invoice, setInvoice] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceId = async () => {
      try {
        const id = await activeInvoiceId(); 
        setInvoiceId(id); 
      } catch (err) {
        setError("Failed to fetch invoice ID"); 
      }
    };

    fetchInvoiceId(); 
  }, []); 
  useEffect(() => {
    if (invoiceId) { 
      const fetchInvoice = async () => {
        try {
          const fetchedInvoice = await checkout(invoiceId); 
          setInvoice(fetchedInvoice); 
        } catch (err) {
          setError(err.message); 
        } finally {
          setLoading(false);
        }
      };

      fetchInvoice(); 
    }
  }, [invoiceId]); 

  if (loading) return <p>Loading...</p>; 
  if (!invoice) return <p>No invoice found.</p>; 

  return (
    <div className="container mt-4">
      <h2>Invoice Details</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Transaction ID: {invoice.id}</h5>
          <p className="card-text">Transaction Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
          <p className="card-text">Customer Name: {invoice.customerName}</p>
          <p className="card-text">Phone: {invoice.customerPhone}</p>
          <p className="card-text">Address: {invoice.customerAddress}</p>
          <p className="card-text">Total Transaction Amount: ${invoice.totalAmount.toFixed(2)}</p>
          <p className="card-text">Status: {invoice.isPaid ? "Paid" : "Unpaid"}</p>
        </div>
      </div>

      <h3>Invoice Items</h3>
      <table className="table table-bordered">
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
          {invoice.invoiceItems.map((item, index) => (
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

export default Payment;
