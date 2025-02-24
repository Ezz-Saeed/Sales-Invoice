namespace APIs.Models
{
    public class InvoiceItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal SubTotal => Quantity * UnitPrice;
        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }

      
    }
}
