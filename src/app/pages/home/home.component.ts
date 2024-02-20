import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { NgFor } from '@angular/common';
import { ProductService } from '../../service/products.service';
import { BanerComponent } from '../../components/baner/baner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductCartComponent, NgFor,BanerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productService = inject(ProductService);
  productList: any = [];
  ngOnInit(): void {
    this.productService
      .getProduct({ page: 0, size: 4 })
      .subscribe((product: any) => {
        return (this.productList = product.data);
      });
  }
}
