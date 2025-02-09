using System.Text.Json.Serialization;

namespace APIs.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public bool IsPaid { get; set; }
        public int CustomerId { get; set; }
        //[JsonIgnore]
        public Customer Customer { get; set; }
        //[JsonIgnore]
        public ICollection<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();
        //[JsonIgnore]
        public Payment Payment { get; set; }
    }
}
