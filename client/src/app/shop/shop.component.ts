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
  shopParams: ShopParams;
  sortOptions = [
    { name: 'Alphabetical', value: 'nameAsc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  totalCount: number;

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts = () =>
    this.shopService.getProducts().subscribe(
      (res) => {
        this.products = res.data;
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
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  };

  onTypeSelected = (typeId: number) => {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  };

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event: number) {
    const params = this.shopService.getShopParams();

    if (params.pageNumber === event) {
      return;
    }
    params.pageNumber = event;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSearch() {
    const params = this.shopService.getShopParams();

    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);

    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
