import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/libs/orders/services/cart.service';
import { CartItem } from 'src/app/libs/orders/models/cart';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: this.quantity
    };

    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .subscribe((resProduct) => {
        this.product = resProduct['data'];
      });
  }
}
