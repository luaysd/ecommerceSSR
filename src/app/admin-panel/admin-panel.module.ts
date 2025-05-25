import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ManageCategoriesComponent } from './pages/manage-categories/manage-categories.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    AdminPanelComponent,
    NewProductComponent,
    ManageCategoriesComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    InputSwitchModule,
    SliderModule,
    DropdownModule,
    TooltipModule,
    ProgressBarModule,
    SidebarModule

  ]
})
export class AdminPanelModule { }
