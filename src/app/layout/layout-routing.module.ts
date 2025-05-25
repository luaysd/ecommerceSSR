import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes =
[
  {
    path : '',
    component : LayoutComponent,
    children : [
      {
        path : "",
        pathMatch : 'full',
        redirectTo : 'products'
      },
      {
        path : 'products',
        loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path : 'products/:id',
        loadChildren: () => import('../pages/product-details/product-details.module').then(m => m.ProductDetailsModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
