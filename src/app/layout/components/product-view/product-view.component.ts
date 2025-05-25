import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
  numberOfItems : number = 0
  @Input() productDetails : any = {}
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
