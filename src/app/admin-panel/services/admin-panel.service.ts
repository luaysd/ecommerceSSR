import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(
    private http : HttpClient,
    private constantsService : ConstantsService
  ) { }

  uplaodPhotoToImgBB(image : any ){
    return this.http.post(this.constantsService.getApiUrl() + '/products/image', {image : image})
  }
  getCategories(){
    return this.http.get(this.constantsService.getApiUrl() + '/categories')
  }
  createProduct(product : {title : string , description : string , imageUrl : string , price : number , salePercentage : number , isSale : boolean , categoryId : string , count : number } ){

    let body : any  = product

    return this.http.post(this.constantsService.getApiUrl() + '/products', body)
  }
}
