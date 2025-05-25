import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { response } from 'express';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductQuickViewComponent } from './components/product-quick-view/product-quick-view.component';
import { LayoutService } from '../../layout/services/layout.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productList : any[] = []
  constructor(
    private productsService : ProductsService,
    private dialogService: DialogService,
    private layoutService : LayoutService
  ){

    // afterNextRender(()=>{
      layoutService.title.set('Products')
      layoutService.breadCrumb.set(['Home','Products'])
      productsService.getProducts().subscribe((response : any)=>{
        this.productList = response?.productsList
      // })
    })

  }
  openQuickView(product : any){
    this.dialogService.open(ProductQuickViewComponent, {data :product, styleClass : 'custom-dialog'})
  }
  likeProduct(product : any){
    this.productsService.likeProduct(product.id, !product.isFavorite).subscribe()
    this.productList[this.productList.findIndex(element=>element.id == product.id)].isFavorite  = !product.isFavorite

  }

}
