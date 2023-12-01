import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-products-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.scss']
})
export class CategoryBannerComponent {
  isSpinner = true;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories['data'];
        this.isSpinner = false;
      });
  }

}
