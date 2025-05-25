import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  isShowHeader : boolean = true
  title :  WritableSignal<string> = signal('')
  breadCrumb : WritableSignal<string[]> = signal([])

  showHeader(){
    this.isShowHeader = true
  }
  hideHeader(){
    this.isShowHeader = false
  }
}
