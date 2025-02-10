using APIs.Models;
using Microsoft.EntityFrameworkCore;

namespace APIs.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Invoice-Items Relationship
            modelBuilder.Entity<InvoiceItem>()
                .HasOne(ii => ii.Invoice)
                .WithMany(i => i.InvoiceItems)
                .HasForeignKey(ii => ii.InvoiceId);

            // Product-Items Relationship
            modelBuilder.Entity<InvoiceItem>()
                .HasOne(ii => ii.Product)
                .WithMany(p => p.InvoiceItems)
                .HasForeignKey(ii => ii.ProductId);

            // Customer-Invoices Relationship
            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Customer)
                .WithMany(c => c.Invoices)
                .HasForeignKey(i => i.CustomerId);

            // Invoice-Payment Relationship
            //modelBuilder.Entity<Payment>()
            //    .HasOne(p => p.Invoice)
            //    .WithOne(i => i.Payment);



            // seed product
            modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Laptop", Price = 1500.00m, Description = "Description", StockQuantity=20 },
            new Product { Id = 2, Name = "Smartphone", Price = 800.00m, Description = "Description", StockQuantity = 30 },
            new Product { Id = 3, Name = "Tablet", Price = 600.00m, Description = "Description", StockQuantity = 9 }
        );

            // Seed Customers
            modelBuilder.Entity<Customer>().HasData(
                new Customer { Id = 1, Name = "John Doe", Email = "john.doe@example.com" },
                new Customer { Id = 2, Name = "Jane Smith", Email = "jane.smith@example.com" }
            );
        }


    }
}

