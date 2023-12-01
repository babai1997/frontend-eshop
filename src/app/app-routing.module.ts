import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './admin/shared/shell/shell.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './admin/pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './admin/pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './admin/pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './admin/pages/products/products-form/products-form.component';
import { UsersListComponent } from './admin/pages/users/users-list/users-list.component';
import { UsersFormComponent } from './admin/pages/users/users-form/users-form.component';
import { OrdersListComponent } from './admin/pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './admin/pages/orders/orders-detail/orders-detail.component';
import { HomePageComponent } from './ng-shop/pages/homePage/homePage.component';
import { AuthGuard } from './libs/users/services/auth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: "full" ,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  },
  {
    path: 'admin',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'orders/:id',
        component: OrdersDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
