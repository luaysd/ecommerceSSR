import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductViewComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [ProductViewComponent]
})
export class ProductViewModule { }
