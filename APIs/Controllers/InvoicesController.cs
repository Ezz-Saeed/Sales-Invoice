using APIs.Data;
using APIs.DTOs;
using APIs.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController(AppDbContext context, IMapper mapper) : ControllerBase
    {
        [HttpPost("generateInvoice")]
        public IActionResult GenerateInvoice([FromBody] InvoiceDto invoiceDto)
        {
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
            return Ok();
        }
    }
}
