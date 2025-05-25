import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AdminPanelService } from './services/admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  sidebarVisible :boolean = false
}
