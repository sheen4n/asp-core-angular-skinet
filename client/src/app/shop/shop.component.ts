import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'nameAsc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  totalCount: number;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts = () =>
    this.shopService.getProducts(this.shopParams).subscribe(
      (res) => {
        this.products = res.data;
        this.shopParams.pageNumber = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
      },
      (err) => console.log(err)
    );

  getBrands = () =>
    this.shopService.getBrands().subscribe(
      (res) => (this.brands = [{ id: 0, name: 'All' }, ...res]),
      (err) => console.log(err)
    );

  getTypes = () =>
    this.shopService.getTypes().subscribe(
      (res) => (this.types = [{ id: 0, name: 'All' }, ...res]),
      (err) => console.log(err)
    );

  onBrandSelected = (brandId: number) => {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  };

  onTypeSelected = (typeId: number) => {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  };

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: number) {
    if (this.shopParams.pageNumber === event) {
      return;
    }

    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
