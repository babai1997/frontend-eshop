import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// COMPONENTS
import { ShellComponent } from './admin/shared/shell/shell.component';
import { SidebarComponent } from './admin/shared/sidebar/sidebar.component';
import { FooterComponent } from './ng-shop/shared/footer/footer.component';
import { HeaderComponent } from './ng-shop/shared/header/header.component';
import { MessagesComponent } from './ng-shop/shared/messages/messages.component';
import { NavComponent } from './ng-shop/shared/nav/nav.component';
import { CategoriesFormComponent } from './admin/pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './admin/pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from './admin/pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './admin/pages/orders/orders-list/orders-list.component';
import { ProductsFormComponent } from './admin/pages/products/products-form/products-form.component';
import { ProductsListComponent } from './admin/pages/products/products-list/products-list.component';
import { UsersListComponent } from './admin/pages/users/users-list/users-list.component';
import { UsersFormComponent } from './admin/pages/users/users-form/users-form.component';
import { HomePageComponent } from './ng-shop/pages/homePage/homePage.component';



// Import PrimeNG modules
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// CUSTOM TEMPLATE
import { UsersModule } from './libs/users/users.module';
import { ProductsModule } from './libs/products/products.module';
import { UiModule } from './libs/ui/ui.module';
import { OrdersModule } from './libs/orders/orders.module';
import { JwtInterceptor } from './libs/users/services/jwt.interceptor';
import { HomeComponent } from './home/home.component';





const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
  TieredMenuModule,
  ProgressSpinnerModule
];


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    MessagesComponent,
    NavComponent,
    CategoriesFormComponent,
    CategoriesListComponent,
    DashboardComponent,
    OrdersDetailComponent,
    OrdersListComponent,
    ProductsFormComponent,
    ProductsListComponent,
    UsersFormComponent,
    UsersListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX_MODULE,
    UsersModule,
    ProductsModule,
    UiModule,
    OrdersModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
