import { afterNextRender, Component } from '@angular/core';
import { LayoutService } from '../../layout/services/layout.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  productDetails : any = {}
  constructor(
    private layoutService : LayoutService,
    private route : ActivatedRoute,
    private productsService :ProductsService
  ){

        layoutService.title.set( route.snapshot.queryParams['title'])
        layoutService.breadCrumb.set( ['Home' , route.snapshot.queryParams['title']  ])
        productsService.getProductDetails(route.snapshot.params['id']).subscribe((response : any)=>{

          this.productDetails = response.productDetails

        })
  }

}
