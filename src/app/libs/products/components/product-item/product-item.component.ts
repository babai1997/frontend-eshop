import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from 'src/app/libs/orders/services/cart.service';
import { CartItem } from 'src/app/libs/orders/models/cart';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }
}
