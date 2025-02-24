using APIs.DTOs;
using APIs.Models;
using AutoMapper;

namespace APIs.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<InvoiceItemDto, InvoiceItem>().ReverseMap()
            //    .ForMember(d=>d.ProductName, opt=>opt.MapFrom(s=>s.Product.Name));

            CreateMap<InvoiceItemDto, InvoiceItem>();
            

            CreateMap<InvoiceDto, Invoice>()
                .ForMember(d => d.InvoiceItems, opt => opt.MapFrom(s => s.InvoiceItems));

            CreateMap<CustomerDto, Customer>();

        }
    }
}
