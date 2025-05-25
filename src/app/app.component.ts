import { HttpClient } from '@angular/common/http';
import { Component, OnInit, afterNextRender, afterRender } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  date : any = 2323223
  constructor(
    private http : HttpClient
     ){
      afterNextRender(()=>{
        setTimeout(() => {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }, 100);
      })
     }

     ngOnInit(): void {


     }

  title = 'ecommerceSSR';
}
