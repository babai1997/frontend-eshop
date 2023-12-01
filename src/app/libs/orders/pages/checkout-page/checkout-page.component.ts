import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/libs/users/services/users.service';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { LocalstorageService } from 'src/app/libs/users/services/localstorage.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private localStorageToken: LocalstorageService
  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '';
  countries = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._autoFillUserData();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _autoFillUserData() {
    const token = this.localStorageToken.getToken();
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));
    const userId = tokenDecode._id;
    console.log(userId, "userId")
    this.usersService
      .getUser(userId)
      .subscribe((user) => {
        console.log(user)
        if (user['success']) {

          this.userId = userId;
          this.checkoutForm['name'].setValue(user['data'].name);
          this.checkoutForm['email'].setValue(user['data'].email);
          this.checkoutForm['phone'].setValue(user['data'].phone);
          this.checkoutForm['city'].setValue(user['data'].city);
          this.checkoutForm['street'].setValue(user['data'].street);
          this.checkoutForm['country'].setValue(user['data'].country);
          this.checkoutForm['zip'].setValue(user['data'].zip);
          this.checkoutForm['apartment'].setValue(user['data'].apartment);
        }
      });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
