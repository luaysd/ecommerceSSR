import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpClient : HttpClient,
    private constantsService : ConstantsService
      ) { }

  getProducts(){
    return this.httpClient.get(this.constantsService.getApiUrl() + '/products')
    // return this.httpClient.get('../../assets/fake-products.json')
  }
  getProductDetails(productId : string){
    return this.httpClient.get(this.constantsService.getApiUrl() + '/products/'+ productId)
    // return this.httpClient.get('../../assets/fake-products.json')
  }
  likeProduct(productId : string, isLike : boolean){
    return this.httpClient.post(this.constantsService.getApiUrl() + '/products/like/'+productId,{isLike :isLike})
    // return this.httpClient.get('../../assets/fake-products.json')
  }
}
