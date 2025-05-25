import { Component, OnInit, afterNextRender } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  items : any[] = []
  menuItems : any[] = [

    {

      title : 'Shop',
      isMega : false,
      children : [
        {
          title : 'Products',
          icon : 'fa-solid fa-video',
          route: '/layout/products'
        },
        {
          title : 'Product Details',
          icon : 'fa-solid fa-video',
          route: '/layout/products/86'
        },
        {
          title : 'item 3',
          icon : 'fa-solid fa-video'
        },
      ]
    },
    {

      title : 'Menu 2',
      children : [
        {
          title : 'item 1',
          icon : 'fa-solid fa-video',
        },
        {
          title : 'item 2',
          icon : 'fa-solid fa-video'
        },
        {
          title : 'item 3',
          icon : 'fa-solid fa-video'
        },
      ]
    },
    {

      title : 'Admin',
      route : '/admin-panel'
      // children : [
      //   {
      //     title : 'item 1',
      //     icon : 'fa-solid fa-video',
      //   },
      //   {
      //     title : 'item 2',
      //     icon : 'fa-solid fa-video'
      //   },
      //   {
      //     title : 'item 3',
      //     icon : 'fa-solid fa-video'
      //   },
      // ]
    }
  ]
  constructor(
    private http : HttpClient,
    public layoutService : LayoutService
    ){
    afterNextRender(()=>{
      window.screenTop = 0;
    })
      this.http.get('../../assets/fake-products.json').pipe(map(res => res)).subscribe((response : any)=>{
        this.items = response.products
    })
  }
  ngOnInit(): void {




  }
}
