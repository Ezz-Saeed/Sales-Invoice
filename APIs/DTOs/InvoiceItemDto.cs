using APIs.Models;

namespace APIs.DTOs
{
    public class InvoiceItemDto
    {
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice => Quantity * UnitPrice;
        public int? InvoiceId { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
    }
}
