import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts'
import { FileUploadService } from 'src/app/services/file-upload.service';
import HC_exporting from 'highcharts/modules/exporting';
import{faFilePdf} from '@fortawesome/free-solid-svg-icons'
import { HighchartsService } from 'src/app/services/highcharts.service';
HC_exporting(Highcharts);
@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss']
})
export class TryComponent implements OnInit {
  @ViewChild("others", { static: false }) others: any;
  uploadicon =faFilePdf
  DA:any=[]
  CAT:any=[]
  t:any=this.service.type

  constructor(private service:HighchartsService , private service1:FileUploadService) {
    for (let item of this.service1.data) {
      this.service.da.push(Number(item[this.service.SELECTED]))
    this.DA.push(Number(item[this.service.SELECTED]))
    this.service.categories.push(item[this.service.SELECTED1])
    this.CAT.push(item[this.service.SELECTED1])

    console.log(this.DA)
    console.log(this.CAT)
    // this.service.Autre=this.others

    }

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  name:string='i\'m the name'

highcharts=Highcharts
chartOptions:Highcharts.Options={
  title:{
    text:this.service1.fileName
  },
  xAxis:{
    title:{
      text:this.service.SELECTED1
    },
    categories:this.CAT

  },
  yAxis:{
    title:{
      text:this.service.SELECTED
    }
  },
  credits:{
    enabled:false,
  },
  exporting: {
      enabled: true,
      showTable: false,

      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadSVG", "downloadPNG", "downloadPDF","downloadJPEG","downloadXLS"]
        }
      }
    },
  series:[{
    data:this.DA,
    type:this.t
  }],



}

public export = (type: any) => {
    switch (type) {
      case "pdf":
        this.others.chart.exportChart({
          type: "application/pdf",
          filename:'charts '+this.service1.fileName
        });
        break;
      // case "png":
      //   this.lineChart.chart.exportChart({
      //     type: "image/png",
      //     filename: "line-chart"
      //   });
      //   break;
      // case "jpeg":
      //   this.lineChart.chart.exportChart({
      //     type: "image/jpeg",
      //     filename: "line-chart"
      //   });
      //   break;
      // case "csv":
      //   this.lineChart.chart.downloadCSV();
      //   break;
      // case "excel":
      //   this.lineChart.chart.downloadXLS();
      //   break;
      // case "svg":
      //   this.lineChart.chart.exportChart({
      //     type: "image/svg+xml",
      //     filename: "line-chart"
      //   });
      //   break;
    }
  }

}