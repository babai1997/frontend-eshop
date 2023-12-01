import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  isSpinner = true;
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });

    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts['data'];
      this.isSpinner = false;
    });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((resCats) => {
      this.categories = resCats['data'];
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category._id);
      console.log(selectedCategories,"___________");


    this._getProducts(selectedCategories);
  }
}
