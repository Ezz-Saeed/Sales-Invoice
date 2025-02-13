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
      <h2 className="mb-3">Invoice Details</h2>
  
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Transaction ID: {invoice.id}</h5>
          
          <div className="row">
            <div className="col-md-6">
              <p className="card-text"><strong>Transaction Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
              <p className="card-text"><strong>Customer Name:</strong> {invoice.customerName}</p>
              <p className="card-text"><strong>Phone:</strong> {invoice.customerPhone}</p>
            </div>
            <div className="col-md-6">
              <p className="card-text"><strong>Address:</strong> {invoice.customerAddress}</p>
              <p className="card-text"><strong>Total Amount:</strong> ${invoice.totalAmount.toFixed(2)}</p>
              <p className="card-text">
                <strong>Status:</strong>{" "}
                <span className={`fw-bold ${invoice.isPaid ? "text-success" : "text-danger"}`}>
                  {invoice.isPaid ? "Paid" : "Unpaid"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Invoice Items */}
      <h3 className="mb-3">Invoice Items</h3>
  
      {invoice.invoiceItems.length === 0 ? (
        <p className="text-muted">No items added.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
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
      )}
    </div>
  );
  
};

export default Payment;
