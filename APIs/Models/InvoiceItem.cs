﻿namespace APIs.Models
{
    public class InvoiceItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice => Quantity * UnitPrice;
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
