import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {


  selected: string =''
  _routerSubscription :any

  constructor(private service:FileUploadService ,public dialogRef: MatDialogRef<PopupComponent> ,private route:Router) { }

  ngOnInit(): void {
    
  }
  submit(){

    if(this.selected == 'Yes' ){
      this.service.isHeader = true
      this.closeDialog()
      this.route.navigateByUrl('confirm')
    }else if(this.selected == 'No'){
      this.service.isHeader = false
      this.closeDialog()
      this.route.navigateByUrl('confirm')
    } else {
      alert('Select a choice pls')
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
  radioChanged(e:any){
      this.selected = e.target?.value;
      console.log(this.selected)
  }
}
