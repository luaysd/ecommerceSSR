import { afterNextRender, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AdminPanelService } from '../../services/admin-panel.service';
import { catchError, from, Subject, takeUntil } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import imglyRemoveBackground, { Config, preload } from "@imgly/background-removal"
import imageCompression, { Options } from 'browser-image-compression';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
  product: any = {
    salePercentage : 0,
    price : 0,
  }
  image : any
  isDragOver : boolean = false
  isLoading : boolean = false
  categoryList : any[] = []
  @ViewChild('fileUpload') fileUpload !: FileUpload
  isRemovePhotoBackgroundEnabled : boolean = false
  isCompressImageEnabled : boolean = true
  isRemoveBackgroundLoading : boolean = false
  cancelImageRemoveBackround$ : Subject<any> = new Subject()
  removeBackgroundConfig: Config = {
    progress: (key, current, total) => {
      console.log(`Downloading ${key}: ${current} of ${total}`);
    }
  }
  config : any = {
    isRemovePhotoBackgroundEnabled : true,
    isCompressImageEnabled : true,
    maxAcceptedImageSize : 250000 //250KB
  }
  constructor(
    private adminPanelService : AdminPanelService
  ){
    adminPanelService.getCategories().subscribe((response : any) =>{
      this.categoryList = response.categoryList
    })
    afterNextRender(()=>{
      if(this.config.isRemovePhotoBackgroundEnabled){
        preload(this.removeBackgroundConfig).then(() => {
          console.log("Asset preloading succeeded")
        })
      }
    })
  }
  onSubmit(form : NgForm){

    let commaIndex = this.image.indexOf(",");
    if (commaIndex !== -1) {
    // Extract the base64 data by removing the prefix
    var base64Data = this.image.substring(commaIndex + 1);
}
    this.isLoading = true
    this.adminPanelService.uplaodPhotoToImgBB(base64Data).pipe(catchError((error : any)=>{
      this.isLoading = false

      throw new Error()
    })).subscribe((imageDetails : any)=>{
      if(imageDetails?.data?.success){
        let price : number  = this.product.isSale ? this.product.priceAfterSale : this.product.price
        this.adminPanelService.createProduct({title : this.product.title , description : this.product.description , imageUrl : imageDetails?.data?.data?.url , categoryId : this.product.categoryId , count : 0 ,  isSale : this.product.isSale , price : price , salePercentage : this.product.salePercentage }).subscribe({
          next: (response : any) => {
          this.product = {}
          this.image = null
          this.isLoading = false
        },
          error: (error : any) => { this.isLoading = false},
      })
      }else{
         this.isLoading = false
      }
    })

  }
  onUpload(event : any){
    // this.image = event.files[0].objectURL
    this.isDragOver = false
    // this.readImageAsBlob( event.files[0]);
    this.resizeAndConvertToBase64(event.files[0])
  }
  cancelImage(){
    this.image = null
    this.isDragOver = false
    // this.fileUpload.clear()
  }
  onDragOver(event: any) {
    this.isDragOver = true
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: any) {
    this.isDragOver = false
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if(!this.image){
      const files = event.dataTransfer?.files;
      this.handleFiles(files);
    }
  }

  handleFiles(files: any) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log('File:', file.name, file.size, file.type);
      // this.readImageAsBlob(file);
       this.resizeAndConvertToBase64(file)

      // Here you can upload the file using Angular HttpClient or any other method
    }
  }
  readImageAsBlob(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  onChangeSalePercentage(event : any){
    let salePercentage : number = event
    if(salePercentage >= 100)
      salePercentage = 100
    this.product.priceAfterSale = this.product.price -(this.product.price *  this.product.salePercentage/100)


  }
  onChangeIsSale(event : any){

    this.product.salePercentage = 0
    if(event){
      this.product.priceAfterSale = this.product.price
    }else{
      this.product.priceAfterSale = 0
    }
  }
  onChangePriceAfterSale(event : any){
    let priceAfterSale : number = event
    if(event <= this.product.price){
      this.product.salePercentage = (1 - priceAfterSale/this.product.price) * 100

    }

  }
  onChangePrice(event : any){
    this.product.isSale = false
  }

  onUploadImage(event:any){
    this.onUpload(event.currentTarget)
  }
  async compressImage(file : File){
    const options : Options = {
      // maxSizeMB: 0.1,
      maxWidthOrHeight : 720,
      useWebWorker: false,
      initialQuality : 0.7

    }
    let compressedFile : File = file
    // let targetSize : number

    // if(file.size > 5000000){
    //   targetSize = 95000
    // }else{
    //   targetSize = 60000
    // }
    // while(compressedFile.size > targetSize){
      debugger
      if(this.config.isCompressImageEnabled && this.isCompressImageEnabled && compressedFile.size > this.config.maxAcceptedImageSizeKB)//250 KB
      compressedFile = await imageCompression(compressedFile, options);
      return compressedFile
  }
  async removeBackground(file : Blob) : Promise<Blob>{
return new Promise((resolve) => {
debugger
    const reader = new FileReader();
    reader.onload =  (e : any) => {
 //     const img = new Image();
 //     img.src = e.target.result;
 //     img.onload =  () => {
 //         const canvas = document.createElement("canvas");
 //         const ctx = canvas.getContext("2d");
 //         //maybe u need to change (canvas.width, canvas.height)
 //         //if you want to scale down to different size
 //         canvas.width = 1200;
 //         canvas.height = 900;
 //         ctx?.drawImage(img, 0, 0, 1200, 900);
 //         // you can change "image/png" to "image/jpeg"
 //         // if "jpeg" image needed
 //         const resizedBase64 : string = String(canvas.toDataURL("image/png"));
 //         debugger


           this.isRemoveBackgroundLoading = true

           from(imglyRemoveBackground(e.target.result,this.removeBackgroundConfig)).pipe(takeUntil(this.cancelImageRemoveBackround$)).subscribe((blob: Blob) => {
             // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
             debugger
             if(!this.isRemoveBackgroundLoading)
               return

               this.isRemoveBackgroundLoading = false
                resolve(blob);

           })

 //       };
       // this.image = e.target.result;

      }
      reader.readAsDataURL(file);
  })
}
  async resizeAndConvertToBase64(file : File){
    if(file.type !== 'image/jpg' &&  file.type!== 'image/jpeg'){
      let jpegImage = await this.convertToJPEG(await this.fileToBase64(file))
      file =  this.base64ToFile(jpegImage.split(',')[1])
    }
    if(this.config.isRemovePhotoBackgroundEnabled && this.isRemovePhotoBackgroundEnabled){
      if(file.size > this.config.maxAcceptedImageSizeKB){
       file =  await this.compressImage(file)
      }
      let blobWithoutBackground : Blob =  await this.removeBackground(file)
      if(blobWithoutBackground.size > this.config.maxAcceptedImageSizeKB)//250 KB
      {
        this.image = await this.fileToBase64(await this.compressImage(new File([blobWithoutBackground] , 'namesdsd' , {type : 'image/jpeg'})))

      }else{
        this.blobToBase64(blobWithoutBackground).then(res=>{
          this.image = res
        })
      }
      }else{

        this.image = await this.fileToBase64(await this.compressImage(file))

      }

      };
      fileToBase64(file : File) : Promise<any>{

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });
      }
        blobToBase64(blob : Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };
      cancelRemoveBackground(event : any){
        this.isRemoveBackgroundLoading = false
        this.cancelImageRemoveBackround$.next(true)
      }
      @ViewChild('canvas') canvasRef: ElementRef = new ElementRef(null);
      convertedImageUrl: string = '';

      convertToJPEG(imageData: string): Promise<any> {
        return  new Promise((resolve) =>{

        const canvas: HTMLCanvasElement = this.canvasRef.nativeElement ;
        const ctx : CanvasRenderingContext2D = canvas.getContext('2d') || new CanvasRenderingContext2D();
        const img: HTMLImageElement = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Convert image to JPEG
          const jpegData: string = canvas.toDataURL('image/jpeg');
           resolve(jpegData);
        };

        img.src = imageData;
      })

    }
    base64ToFile(base64String : string){
      const byteArray = Uint8Array.from(
        atob(base64String)
          .split('')
          .map(char => char.charCodeAt(0))
      );
     return  this.blobToFile(new Blob([byteArray], { type: 'image/jpeg' }), 'rtrtrt.jpeg')
      }
      blobToFile(theBlob: Blob, fileName:string): File  {
        const b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        //Cast to a File() type
        return theBlob as File;
      }
}
