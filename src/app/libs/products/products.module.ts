import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { OrdersModule } from '../orders/orders.module';
import { UiModule } from '../ui/ui.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'category/:categoryid',
        component: ProductListComponent
      },
      {
        path: 'products/:productid',
        component: ProductPageComponent
      }
    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    ProgressSpinnerModule
  ],
  declarations: [
    ProductSearchComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductPageComponent
  ],
  exports: [
    ProductSearchComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductPageComponent
  ]
})
export class ProductsModule {}
