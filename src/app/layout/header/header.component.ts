import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router : Router,
    public activatedRoute : ActivatedRoute

    ){

  }
  

  navigateTo(route : string){
    this.router.navigate([route],{relativeTo:this.activatedRoute})
  }

}
