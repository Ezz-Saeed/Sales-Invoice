import React, { useEffect, useState } from "react";
import { getInvoice } from "../Services/productService";
import { activeInvoiceId } from "../Services/productService"; // Adjust the path as needed
import { Link } from "react-router-dom";

const InvoiceDetails = () => {
  const [invoiceId, setInvoiceId] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveInvoiceId = async () => {
      try {
        const id = await activeInvoiceId();
        setInvoiceId(id);
      } catch (err) {
        setError("Failed to fetch active invoice ID");
      }
    };

    fetchActiveInvoiceId();
  }, []);

  useEffect(() => {
    if (!invoiceId) return; // Wait until the invoiceId is set
    const fetchInvoice = async () => {
      try {
        const fetchedInvoice = await getInvoice(invoiceId);
        setInvoice(fetchedInvoice);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  if (loading) return <p>Loading invoice...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!invoice) return <p>No invoice found.</p>;

  return (
  <div className="container mt-4">
    <h2>Invoice Details</h2>
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Transaction ID: {invoice.id}</h5>
        <p className="card-text">
          Transaction Date: {new Date(invoice.invoiceDate).toLocaleDateString()}
        </p>
        <p className="card-text">Status: {invoice.isPaid ? "Paid" : "Unpaid"}</p>
      </div>
    </div>

    <h3>Invoice Items</h3>
    {invoice.invoiceItems.length === 0 ? (
      <p>No items found.</p>
    ) : (
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
    )}
   {invoice.invoiceItems.length > 0 && (
      <div className="mt-4">
        <Link to={`/checkout`} className="btn btn-primary">
          Proceed to Checkout
        </Link>
      </div>
    )}
  </div>
);

};

export default InvoiceDetails;
