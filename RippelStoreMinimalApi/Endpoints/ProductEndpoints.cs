using Microsoft.AspNetCore.Http.HttpResults;
using RippelStoreMinimalApi.Models;
using RippelStoreMinimalApi.DTOs;

namespace RippelStoreMinimalApi.Endpoints
{
    public static class ProductEndpoints
    {
        private static readonly List<Product> _products = [];

        public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/products").WithTags("Products");

            group.MapGet("/", GetAll);
            group.MapGet("/{id:int}", GetById);
            group.MapPost("/", Create);

            return app;
        }

        private static Ok<List<Product>> GetAll()
        {
            return TypedResults.Ok(_products);
        }

        public static IResult GetById(int id)
        {
            Product product = _products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(product);
        }
        private static IResult Create(CreateProductRequest product)
        {
            var newProduct = new Product(_products.Count + 1, product.Name, product.Price);
            _products.Add(newProduct);
            return TypedResults.Created($"/products/{newProduct.Id}", newProduct);
        }
    }
}
