import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/libs/orders/models/order';
import { ORDER_STATUS } from 'src/app/libs/orders/orders.constants';
import { OrdersService} from 'src/app/libs/orders/services/orders.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  isSpinner = true;
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy() {
    //this.endsubs$.next();
    //this.endsubs$.complete();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.orderService
          .getOrder(params['id'])
          .subscribe((order) => {
            this.order = order['data'];
            this.selectedStatus = order['data'].status;
            this.isSpinner = false
          });
      }
    });
  }

  onStatusChange(event) {
    this.orderService
      .updateOrder({ status: event.value }, this.order._id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!'
          });
        },
        // () => {
        //   this.messageService.add({
        //     severity: 'error',
        //     summary: 'Error',
        //     detail: 'Order is not updated!'
        //   });
        // }
      );
  }
}
