import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/libs/orders/models/order';
import { ORDER_STATUS } from 'src/app/libs/orders/orders.constants';
import { OrdersService } from 'src/app/libs/orders/services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {
  isSpinner = true;
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }
  ngOnDestroy() {
    //this.endsubs$.next();
    this.endsubs$.complete();
  }

  _getOrders() {
    this.ordersService
      .getOrders()
      //.pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => {
        this.orders = orders['data'];
        this.isSpinner = false;
      });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`admin/orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService
          .deleteOrder(orderId)
          //.pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getOrders();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order is deleted!'
              });
            },
            // () => {
            //   this.messageService.add({
            //     severity: 'error',
            //     summary: 'Error',
            //     detail: 'Order is not deleted!'
            //   });
            // }
          );
      }
    });
  }
}
