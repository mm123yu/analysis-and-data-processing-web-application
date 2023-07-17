import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HighchartsService } from 'src/app/services/highcharts.service';
@Component({
  selector: 'app-dist',
  templateUrl: './dist.component.html',
  styleUrls: ['./dist.component.scss']
})
export class DistComponent implements OnInit {

  highcharts=Highcharts
  
  chartOptions:Highcharts.Options={
    title:{
      text:this.service1.fileName
    },
    xAxis:{
      title:{
        text:this.service.SELECTED
      },
      categories:this.service.xAxe
      
    },
    yAxis:{
      title:{
        text:'occurence'
      }
    },
    series:[{
      data:this.service.yAxe,
      type:'line'
    }]}
  
  constructor(private service:HighchartsService , private service1:FileUploadService) { }

  ngOnInit(): void {

  }
}
