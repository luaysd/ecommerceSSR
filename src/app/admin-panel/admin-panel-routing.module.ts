import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { ManageCategoriesComponent } from './pages/manage-categories/manage-categories.component';

const routes: Routes = [
  {
    path : '',
    component : AdminPanelComponent,
    children: [
      {
        path : '',
        pathMatch : 'full',
        redirectTo : 'product'
      },
      {
        path : 'product',
        component : NewProductComponent
      },
      {
        path : 'categories',
        component : ManageCategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
