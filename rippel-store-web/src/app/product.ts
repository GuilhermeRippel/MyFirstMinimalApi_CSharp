// Mesmo formato do JSON que a API devolve
export interface Product {
  id: number;
  name: string;
  price: number;
}

// Mesmo formato do CreateProductRequest da API
export interface CreateProductRequest {
  name: string;
  price: number;
}
