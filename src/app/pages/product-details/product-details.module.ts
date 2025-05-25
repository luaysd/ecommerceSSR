import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { FormsModule } from '@angular/forms';
import { ProductViewModule } from '../../layout/components/product-view/product-view.module';


@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    FormsModule,
    ProductViewModule
  ]
})
export class ProductDetailsModule { }
