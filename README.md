# My First Minimal API (C#)

Minha primeira **Minimal API** feita com **ASP.NET Core 8**. É uma API simples de produtos para a "Rippel Store", criada para praticar os conceitos básicos de Minimal APIs.

## O que ela faz

A API permite cadastrar e consultar produtos. Os dados ficam guardados **em memória** (uma lista estática), então são perdidos quando a aplicação reinicia.

| Método | Rota             | Descrição                     |
|--------|------------------|-------------------------------|
| GET    | `/products`      | Lista todos os produtos       |
| GET    | `/products/{id}` | Busca um produto pelo ID      |
| POST   | `/products`      | Cria um novo produto          |

Exemplo de corpo para o `POST /products`:

```json
{
  "name": "Camiseta",
  "price": 59.90
}
```

## Conceitos praticados

- Minimal APIs com `MapGroup` e endpoints organizados em métodos de extensão
- `TypedResults` (`Ok`, `NotFound`, `Created`)
- `record` para modelos e DTOs
- Swagger/OpenAPI para documentar e testar a API

## Como executar

Pré-requisito: [.NET 8 SDK](https://dotnet.microsoft.com/download)

```bash
cd RippelStoreMinimalApi
dotnet run
```

Em ambiente de desenvolvimento, a documentação do Swagger fica disponível em `/swagger`.
