using APIs.DTOs;
using APIs.Models;
using AutoMapper;

namespace APIs.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<InvoiceItemDto, InvoiceItem>().ReverseMap()
                .ForMember(d=>d.ProductName, opt=>opt.MapFrom(s=>s.Product.Name));

            //CreateMap<Payment, PaymentDto>()
            //    .ForMember(d=>d.Invoice, opt=>opt.MapFrom(s=>s.Invoice));

            CreateMap<Invoice, InvoiceDto>()
                .ForMember(d => d.CustomerName, opt => opt.MapFrom(s => s.Customer.Name))
                .ForMember(d => d.CustomerAddress, opt => opt.MapFrom(s => s.Customer.Address))
                .ForMember(d => d.CustomerPhone, opt => opt.MapFrom(s => s.Customer.Phone))
                .ForMember(d => d.InvoiceItems, opt => opt.MapFrom(s => s.InvoiceItems)); 
                
        }
    }
}
