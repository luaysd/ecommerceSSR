import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-quick-view',
  templateUrl: './product-quick-view.component.html',
  styleUrl: './product-quick-view.component.scss'
})
export class ProductQuickViewComponent {

  product : any = {}
  numberOfItems : number = 1
  constructor(
    private dynamicDialogConfig : DynamicDialogConfig
  ){

    this.product = dynamicDialogConfig.data
  }
  decrementCount(){
    if(this.numberOfItems-1 >= 1)
      this.numberOfItems--
  }
  incrementCount(){
    this.numberOfItems++
  }

  onInputChange(event: any) {
    // Get the input value
    let inputValue = event.target.value;

    // Define a regular expression to match only numbers
    let numbersOnly = /^\d+$/;

    // Check if the input value matches the regular expression
    if (!inputValue.match(numbersOnly)) {
      // If the input value contains non-numeric characters, remove them
      event.target.value = inputValue.replace(/\D/g, '');
    }
    if(inputValue <= 0 || !inputValue){
      event.target.value = 0
    }
  }
}
