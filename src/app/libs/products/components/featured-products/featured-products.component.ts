import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent {
  featuredProducts: Product[] = [];

  constructor(private prodService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts() {
    this.prodService
      .getFeaturedProducts(4)
      .subscribe((products) => {
        this.featuredProducts = products['data'];
        console.log(this.featuredProducts,"____________");

      });
  }
}
