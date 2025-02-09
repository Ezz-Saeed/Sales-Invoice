namespace APIs.DTOs
{
    public class InvoiceDto
    {
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public bool IsPaid { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerAddress { get; set; }
        public List<InvoiceItemDto> InvoiceItems { get; set; }
    }
}
