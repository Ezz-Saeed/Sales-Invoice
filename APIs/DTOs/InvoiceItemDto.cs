using APIs.Models;

namespace APIs.DTOs
{
    public class InvoiceItemDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal SubTotal => Quantity * UnitPrice;
        //public int InvoiceId { get; set; }
    }
}
