using System.Text.Json.Serialization;

namespace APIs.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SourceName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }       
        public decimal Tax {  get; set; }
        public bool IsPaid { get; set; }
        public int CustomerId { get; set; }      
        public Customer Customer { get; set; }
        
        public ICollection<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();
        public decimal TotalAmount => SubTotal + (SubTotal * Tax);
        public decimal SubTotal => InvoiceItems.Sum(i => i.SubTotal);


    }
}
