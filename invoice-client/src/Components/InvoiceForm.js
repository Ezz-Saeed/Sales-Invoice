import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const InvoiceForm = () => {
  const { control, handleSubmit, register } = useForm();
  const [invoiceItems, setInvoiceItems] = useState([{ name: "", quantity: 1, unitPrice: 0 }]);
  const [reportUrl, setReportUrl] = useState(null);

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { name: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const invoiceDto = {
      title: data.title,
      sourceName: data.sourceName,
      invoiceDate: data.invoiceDate,
      dueDate: data.dueDate,
      tax: parseFloat(data.tax),
      customer: {
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
      },
      invoiceItems: invoiceItems.map((_, index) => ({
        name: data[`itemName${index}`],
        quantity: parseInt(data[`itemQuantity${index}`], 10),
        unitPrice: parseFloat(data[`itemUnitPrice${index}`]),
      })),
    };

    try {
      const response = await fetch("/api/Invoices/generateInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceDto),
      });

      if (!response.ok) throw new Error("Failed to submit invoice");

      const result = await response.json();
      setReportUrl(result.reportUrl);
      toast.success("Invoice generated successfully!");
    } catch (error) {
      toast.error("Failed to generate invoice.");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper sx={{ padding: 4, marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create Invoice
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Invoice Details */}
            <Grid item xs={12}>
              <Typography variant="h6">Invoice Details</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField label="Title" {...register("title")} fullWidth required />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Source Name" {...register("sourceName")} fullWidth required />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="invoiceDate"
                  defaultValue={dayjs()}
                  render={({ field }) => <DatePicker {...field} label="Invoice Date" format="YYYY-MM-DD" />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="dueDate"
                  defaultValue={dayjs()}
                  render={({ field }) => <DatePicker {...field} label="Due Date" format="YYYY-MM-DD" />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField label="Tax (%)" {...register("tax")} type="number" fullWidth required />
            </Grid>

            {/* Customer Details */}
            <Grid item xs={12}>
              <Typography variant="h6">Customer Details</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField label="Customer Name" {...register("customerName")} fullWidth required />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Email" {...register("customerEmail")} fullWidth required />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Phone" {...register("customerPhone")} fullWidth required />
            </Grid>

            {/* Invoice Items */}
            <Grid item xs={12}>
              <Typography variant="h6">Invoice Items</Typography>
            </Grid>

            {invoiceItems.map((_, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Item Name"
                    {...register(`itemName${index}`)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Quantity"
                    type="number"
                    {...register(`itemQuantity${index}`)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Unit Price"
                    type="number"
                    {...register(`itemUnitPrice${index}`)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button color="error" fullWidth onClick={() => handleRemoveItem(index)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}

            {/* Buttons */}
            <Grid item xs={12}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button variant="contained" color="primary" onClick={handleAddItem} fullWidth>
                  Add Item
                </Button>
                <Button type="submit" variant="contained" color="success" fullWidth>
                  Submit Invoice
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Report Preview Button */}
      {reportUrl && (
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Invoice Generated Successfully!
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={() => window.open(reportUrl, "_blank")}>
            Preview Invoice
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default InvoiceForm;
