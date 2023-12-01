import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from 'src/app/libs/products/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  isSpinner = true;
  products = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  // ngOnDestroy() {
  //   this.endsubs$.next();
  //   this.endsubs$.complete();
  // }

  private _getProducts() {
    this.productsService
      .getProducts()
      .subscribe((products) => {
        this.products = products['data'];
        this.isSpinner = false;
      });
      console.log(this.products,"PRODUCTS");
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`admin/products/form/${productid}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService
          .deleteProduct(productId)
          .subscribe(
            () => {
              this._getProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is deleted!'
              });
            }
          );
      }
    });
  }
}
