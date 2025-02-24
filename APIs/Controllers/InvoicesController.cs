using APIs.Data;
using APIs.DTOs;
using APIs.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Reporting.NETCore;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController(AppDbContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment) : ControllerBase
    {
        [HttpPost("generateInvoice")]
        public IActionResult GenerateInvoice([FromBody] InvoiceDto invoiceDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customer = mapper.Map<Customer>(invoiceDto.Customer);
            var invoice = mapper.Map<Invoice>(invoiceDto);
            
            var existingCustomer = context.Customers.SingleOrDefault(c=>c.Name == customer.Name);
            if(existingCustomer is not null)
            {
                existingCustomer.Invoices.Add(invoice);
                context.Customers.Update(existingCustomer);
            }
            else
            {
                customer.Invoices.Add(invoice);
                context.Customers.Add(customer);
            }
            
            context.SaveChanges();
            LocalReport report = new LocalReport { ReportPath = $"{webHostEnvironment.WebRootPath}/Reports/InvoiceReport.rdlc" };

            List<Customer> customerData = new List<Customer> { customer };
            List<InvoiceItem> invoiceItems = mapper.Map<List<InvoiceItem>>(invoiceDto.InvoiceItems);
            List<Invoice> invoiceData = new List<Invoice> { invoice };

            report.DataSources.Add(new ReportDataSource("Customer", customerData));
            report.DataSources.Add(new ReportDataSource("InvoiceItems", invoiceItems));
            report.DataSources.Add(new ReportDataSource("Invoice", invoiceData));

            ReportParameter[] parameters = new ReportParameter[]
            {
                new ReportParameter("InvoiceSubTotal", invoice.SubTotal.ToString("F2")),
                new ReportParameter("InvoiceTotal", invoice.TotalAmount.ToString("F2")),
            };

            report.SetParameters(parameters);
            byte[] pdfBytes = report.Render("PDF");

            string fileName = $"Invoice_{invoiceDto.Title}_{DateTime.Now.Ticks}.pdf";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "reports", fileName);

            System.IO.File.WriteAllBytes(filePath, pdfBytes);
            string reportUrl = $"{Request.Scheme}://{Request.Host}/Reports/{fileName}";

            return Ok(new { reportUrl });
        }
    }
}
