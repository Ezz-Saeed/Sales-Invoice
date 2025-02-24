namespace APIs.DTOs
{
    public class InvoiceDto
    {
        public string Title { get; set; }
        public string SourceName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public decimal Tax { get; set; }
        public CustomerDto Customer { get; set; }
        public List<InvoiceItemDto> InvoiceItems { get; set; }
    }
}
