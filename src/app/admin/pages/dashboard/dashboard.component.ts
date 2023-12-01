import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { OrdersService } from 'src/app/libs/orders/services/orders.service';
import { ProductsService } from 'src/app/libs/products/services/products.service';
import { UsersService } from 'src/app/libs/users/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  isSpinner = true;
  statistics = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
      .subscribe((values) => {
        this.statistics = values;
        this.isSpinner = false;
      });
  }

  // ngOnDestroy() {
  //   this.endsubs$.next();
  //   this.endsubs$.complete();
  // }
}
