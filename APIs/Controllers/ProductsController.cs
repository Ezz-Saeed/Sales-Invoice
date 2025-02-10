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

        [HttpGet("activeInvoice")]
        public async Task<IActionResult> ActiveInvoice()
        {
            var invoice = await context.Invoices.SingleOrDefaultAsync(i=>i.IsPaid == false);
            if (invoice is null)
            {
                invoice = new Invoice
                {
                    InvoiceDate = DateTime.Now,
                    CustomerId = 1
                };
                await context.Invoices.AddAsync(invoice);
                await context.SaveChangesAsync();
            }
            return Ok(invoice.Id);
        }

        [HttpPost("addToCart")]
        public async Task<IActionResult> AddToCart(InvoiceItemDto dto)
        {
            //Invoice invoice;
            var customer = await context.Customers.Include(c=>c.Invoices).ThenInclude(i=>i.InvoiceItems)
                .SingleOrDefaultAsync(c=>c.Id==1);
            var invoice = customer!.Invoices.SingleOrDefault(i => i.Id == dto.InvoiceId)!;
            //if (invoice is null) return BadRequest("Invalid invoice id!");

            if (invoice is null || invoice.IsPaid)
            {
                invoice = new Invoice
                {
                    InvoiceDate = DateTime.Now,
                };               
                customer!.Invoices.Add(invoice);
                context.Update(customer);               
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
                existingItem.Product = await context.Products.FindAsync(dto.ProductId);
                context.InvoiceItems.Update(existingItem);
                invoice.TotalAmount = invoice.InvoiceItems.Sum(ii => ii.TotalPrice);
            }
            
            await context.SaveChangesAsync();
            return Ok(mapper.Map<InvoiceDto>(invoice));
        }

        [HttpGet("getInvoiceItems/{invoiceId}")]
        public async Task<IActionResult> GetInvoiceItems(int invoiceId)
        {
            var invoice = await context.Invoices.Include(i=>i.InvoiceItems).
                ThenInclude(i=>i.Product).Include(i=>i.Customer).SingleOrDefaultAsync(i=>i.Id== invoiceId);
            if (invoice is null) return BadRequest("Invalid invoice id!");
            var invoiceItems = invoice.InvoiceItems.ToList();
            return Ok(mapper.Map<InvoiceDto>(invoice));
        }

        [HttpPost("checkout/{invoiceId}")]
        public async Task<IActionResult> Checkout(int invoiceId)
        {
            var invoice = await context.Invoices.Include(i => i.InvoiceItems).
                ThenInclude(i => i.Product).Include(i => i.Customer).SingleOrDefaultAsync(i => i.Id == invoiceId);
            if (invoice is null) return BadRequest("Invalid invoice id!");
            invoice.IsPaid = true;
            invoice.InvoiceDate = DateTime.Now;
            context.Invoices.Update(invoice);        
            await context.SaveChangesAsync();
            return Ok(mapper.Map<InvoiceDto>(invoice));
        }
    }
}
