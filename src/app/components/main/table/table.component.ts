import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import{faArrowLeft,faDownload} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  headers = [] //liste des headers
  data : any //contenu du csv
  data1 : any // utilise pour savoir le nombre de colonnes
  toObjects =[] // from array to array of objects
  hasHeader!: boolean; 
  Column:any =[] // variable qui prend les noms de colnnes entres par user
  Name:string // le nom du fichier

//icons

righticon=faArrowLeft
uploadicon =faDownload

  constructor( private service:FileUploadService , private router:Router) {
    setTimeout(()=>{
      this.headers = this.service.headers;
      this.data = this.service.getData();
      console.table(this.data)
    },700);

    this.hasHeader = this.service.isHeader;

    setTimeout(()=>{ //pour calculer le nombre de colomne 
     this.data1 = this.data[0];
     console.log(this.data1)
    },900)

    this.Name = this.service.getFileName()
    console.log(this.service.getFileName())

    // setTimeout(()=>{
     
    // },600)   

  }
  ngOnInit(): void {
   
  }

  get(){
    if(this.hasHeader == true){
      this.service.firethis(this.data,this.Name)
    }else
   {
      console.log(this.Column)
    const pr = () => {

      return new Promise<void>((resolve) => {
        this.ArrayToObject();
        this.service.headers = this.Column
        this.service.data = this.toObjects
        resolve();
      });
     };
      
     pr().then(()=>  this.service.firethis(this.toObjects,this.Name))}
    
  }

  back(){
    this.router.navigate(['main'])
  }

  ArrayToObject(){
    var keys = this.Column;
    this.toObjects = this.data.map((row:any)=>{
      return keys.reduce(function(obj:any,key:any,i:any){
        obj[key] = row[i];
        return obj;
      },{});
    })

    console.table(this.toObjects)
  }

  selectChangeHandler(event:any){
    this.Name = event.target.value;
    this.service.fileName = this.Name
  }


}
