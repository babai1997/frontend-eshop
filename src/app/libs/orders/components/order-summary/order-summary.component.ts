import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { LocalstorageService } from 'src/app/libs/users/services/localstorage.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  endSubs$: Subject<any> = new Subject();
  totalPrice: number;
  isCheckout = false;
  cartCount = 0;
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private localStorage: LocalstorageService
  ) {
    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  // ngOnDestroy(): void {
  //   this.endSubs$.next();
  //   this.endSubs$.complete();
  // }

  _getOrderSummary() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.data.price * item.quantity;
            });
        });
      }
    });
  }

  navigateToCheckout() {
    this.cartService.cart$.subscribe(respCart => {
      this.cartCount = respCart?.items.length;
    })
    const token = this.localStorage.getToken();
    if(!this.cartCount){
      return;
    }
    if(token){
      this.router.navigate(['/checkout']);
    }else{
    this.router.navigate(['/login']);
    }
  }
}
