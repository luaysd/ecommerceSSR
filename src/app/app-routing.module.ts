import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'layout'
  },
  {
    path : 'layout',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)

  },
  {
    path : 'admin-panel',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
