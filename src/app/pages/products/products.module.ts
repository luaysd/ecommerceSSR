import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ProductsComponent } from './products.component';
import { ProductQuickViewComponent } from './components/product-quick-view/product-quick-view.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { SafeModule } from '../../pipes/safe/safe.module';
import { ProductViewModule } from '../../layout/components/product-view/product-view.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductQuickViewComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TooltipModule,
    AnimateOnScrollModule,
    DynamicDialogModule,
    InputNumberModule,
    FormsModule,
    SafeModule,
    ProductViewModule

  ],
  providers : [
    DialogService
  ]
})
export class ProductsModule { }
