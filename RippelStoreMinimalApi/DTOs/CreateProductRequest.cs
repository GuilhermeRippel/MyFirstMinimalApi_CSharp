namespace RippelStoreMinimalApi.DTOs
{
    // O que o cliente pode enviar para criar um produto.
    public record CreateProductRequest(string Name, decimal Price);
}
