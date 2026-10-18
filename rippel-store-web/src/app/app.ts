import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly productService = inject(ProductService);

  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  // Formulário de cadastro
  protected name = '';
  protected price: number | null = null;
  protected readonly saving = signal(false);

  // Busca por id
  protected searchId: number | null = null;
  protected readonly found = signal<Product | null>(null);
  protected readonly searchMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadProducts();
  }

  protected loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(this.describe(err));
        this.loading.set(false);
      },
    });
  }

  protected create(): void {
    if (!this.name.trim() || this.price === null || this.price < 0) {
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    this.productService.create({ name: this.name.trim(), price: this.price }).subscribe({
      next: (product) => {
        this.products.update((list) => [...list, product]);
        this.name = '';
        this.price = null;
        this.saving.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(this.describe(err));
        this.saving.set(false);
      },
    });
  }

  protected search(): void {
    if (this.searchId === null) {
      return;
    }

    const id = this.searchId;
    this.found.set(null);
    this.searchMessage.set(null);
    this.productService.getById(id).subscribe({
      next: (product) => this.found.set(product),
      error: (err: HttpErrorResponse) =>
        this.searchMessage.set(
          err.status === 404 ? `Nenhum produto com id ${id}.` : this.describe(err)
        ),
    });
  }

  private describe(err: HttpErrorResponse): string {
    // status 0 = a requisição nem chegou na API (API desligada, porta errada ou CORS)
    return err.status === 0
      ? 'Não foi possível conectar à API. Ela está rodando em http://localhost:5089?'
      : `Erro ${err.status}: ${err.statusText}`;
  }
}
