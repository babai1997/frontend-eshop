import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/libs/products/models/category';
import { CategoriesService } from 'src/app/libs/products/services/categories.service';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  isSpinner = true;
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }
  ngOnDestroy() {
    //this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteCategory(categoryId: string) {
    console.log(categoryId,"*********")
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService
          .deleteCategory(categoryId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getCategories();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category is deleted!'
              });
            }
          );
      }
    });
  }

  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`admin/categories/form/${categoryid}`);
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((cats) => {
        this.categories = cats['data'];
        this.isSpinner = false
      });
  }
}
