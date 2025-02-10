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
    public class ProductsController(AppDbContext context, IMapper mapper) : ControllerBase
    {
        [HttpGet("getProducts")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpPost("addToCart")]
        public async Task<IActionResult> AddToCart(InvoiceItemDto dto)
        {
            Invoice invoice;
            var customer = await context.Customers.Include(c=>c.Invoices).ThenInclude(i=>i.InvoiceItems)
                .SingleOrDefaultAsync(c=>c.Id==1);

            if (dto.InvoiceId == 0)
            {
                invoice = new Invoice
                {
                    InvoiceDate = DateTime.Now,
                };               
                customer!.Invoices.Add(invoice);
                context.Update(customer);               
            }
            else
            {
                invoice = customer!.Invoices.SingleOrDefault(i=>i.Id== dto.InvoiceId)!;
                if (invoice is null) return BadRequest("Invalid invoice id!");
            }
            var existingItem = invoice.InvoiceItems.FirstOrDefault(ii=>ii.ProductId==dto.ProductId);
            if (existingItem is null)
            {
                var invoiceItem = mapper.Map<InvoiceItem>(dto);
                invoice.InvoiceItems.Add(invoiceItem);
                invoice.TotalAmount += invoiceItem.TotalPrice;
            }
            else
            {
                existingItem.Quantity += dto.Quantity;
                context.InvoiceItems.Update(existingItem);
                invoice.TotalAmount = invoice.InvoiceItems.Sum(ii => ii.TotalPrice);
            }
            
            await context.SaveChangesAsync();
            return Ok(mapper.Map<InvoiceDto>(invoice));
        }

        [HttpGet("getInvoiceItems/{invoiceId}")]
        public async Task<IActionResult> GetInvoiceItems(int invoiceId)
        {
            var invoice = await context.Invoices.Include(i=>i.InvoiceItems).SingleOrDefaultAsync(i=>i.Id== invoiceId);
            if (invoice is null) return BadRequest("Invalid invoice id!");
            var invoiceItems = invoice.InvoiceItems.ToList();
            return Ok(mapper.Map<List<InvoiceItemDto>>(invoiceItems));
        }
    }
}
