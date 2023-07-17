import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {
  SELECTED:any
  SELECTED1:any
  SELECTED2:any
  xAxe:any=[]
  yAxe:any=[]
  categories:any=[]
  da:any=[]
  type:string=''
  constructor() { }
}
