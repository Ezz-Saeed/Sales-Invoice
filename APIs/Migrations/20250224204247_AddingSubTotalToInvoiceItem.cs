﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIs.Migrations
{
    /// <inheritdoc />
    public partial class AddingSubTotalToInvoiceItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "SubTotal",
                table: "InvoiceItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubTotal",
                table: "InvoiceItems");
        }
    }
}
