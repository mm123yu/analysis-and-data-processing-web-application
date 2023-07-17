
import { AfterViewInit, Component,ViewChild} from '@angular/core';

import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import { FileUploadService } from 'src/app/services/file-upload.service';
import HC_exporting from 'highcharts/modules/exporting';

import{faFilePdf} from '@fortawesome/free-solid-svg-icons'
HC_exporting(Highcharts);
declare var $: any;
import ExportingModule from 'highcharts/modules/exporting';
import DownloadingModule from 'highcharts/modules/export-data.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HighchartsService } from 'src/app/services/highcharts.service';
ExportingModule(Highcharts);
DownloadingModule(Highcharts);
const Exporting = require("highcharts/modules/exporting");
 Exporting(Highcharts);



@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements AfterViewInit {

  @ViewChild("DountChart", { static: false }) Dounatchart: any;
  @ViewChild("DemiChart", { static: false }) DemiPieChart: any;
  @ViewChild("piechart", { static: false }) Piechartt: any;
  uploadicon =faFilePdf

   array:any = []  //headers
   highcharts4=Highcharts
   chartOptions4:Highcharts.Options={}
   DATA:any=[]  // data
   selected:any=''
   fileName:any
   moy : any
   med:any
   min:any
   max:any
   Var:any
   Ecart:any
   Tab:any=[]
   Tab1:any=[]
D:any=[]
source :any
selected1:any=''
selected2:any=''
ShowSpinner:boolean=false
ShowSpinner1:boolean=false
ser: Array<{name: string, y: any}>=[]
first :any =[]
cat :any =[]
isChart:boolean=true
isShow:boolean=false
isLine:boolean=false
isArea:boolean=false
isBar:boolean=false
isColumn:boolean=false
isDist:boolean=false
isStat:boolean=false
isPie:boolean=false
isDemiPie:boolean=false
isDount:boolean=false
   Mode:any
   yAxis:any =[] ;
   xAxis:any=[] ;
   highcharts=Highcharts
   chartOptions:any={}
   highcharts1=Highcharts
   highcharts2=Highcharts
   chartOptions1:any={}
   chartOptions2:any={}
   highcharts3=Highcharts
   chartOptions3:any={}
puf:any=[]

  constructor(private service:FileUploadService , private service1:HighchartsService) { 

    setTimeout(() => {
      this.fileName = this.service.getFileName()
      console.log(this.fileName)

      // this.DATA = this.service.getDataFire(this.fileName)
      // this.DATA = this.service.getData()
      this.service.getDataFire(this.fileName).subscribe(data => this.DATA = data)
      // this.length = this.DATA[0]
    }, 300);

    // setTimeout(() => {
    //   for(let item of this.DATA){
    //     console.log(item[this.selected])
    //   }
    // }, 1000);

    // this.tABLE = this.selected
  }
  ngAfterViewInit(): void {
  // if(this.service.isHeader){
    this.array = this.service.headers
    console.log(this.array)
  // }
}

selectChangeHandler (event:any){
  this.selected = event.target.value;
  console.log(this.selected)
  this.service1.SELECTED=this.selected

 
  for (let item of this.DATA ){
    this.first.push(Number(item[this.selected]))
    

    }
   
}
selectChangeHandler1 (event:any){

  this.selected1 = event.target.value;
  console.log(this.selected1)
  this.service1.SELECTED1=this.selected1
 
  for(let item of this.DATA){
    console.log(item[this.selected])
    this.Tab.push(Number(item[this.selected]))
    
    console.log(this.Tab)
  }
//kankharjo data dyal coulumn li selectionina f select tanya li hiya xaxis
  for(let item of this.DATA){
    console.log(item[this.selected1])
    this.Tab1.push(item[this.selected1])
    console.log(this.Tab1)
  }
  //kan3amro dik object li issmo ser b les donnees li selectionina 
  for (let i=0;i<this.Tab.length;i++){
     this.ser.push(
      {
        name:this.Tab1[i],
        y:this.Tab[i]
      }
     )
      
    }
  }

selectChangeHandler2(event:any){
  this.selected2= event.target.value;
  console.log(this.selected2)
  this.service1.SELECTED2=this.selected2
  this.moyenne()
  this.mediane()
  this.maximum()
  this.minimum()
  this.Mode = this.mode()
  this.Occurence()
  this.ShowSpinner=true;
  setTimeout(()=>{
    this.ShowSpinner=false
  },1000)
  //  this.isDist=true
//   this.service.xAxe=this.xAxis
// this.service.yAxe=this.yAxis
  setTimeout(()=>{
console.log(this.xAxis)
console.log(this.yAxis)
this.Distribution()
 },1000)

  }

moyenne(){
  var first :any=[]
  var sum=0
  var S=0
  var v=0
  for (let item of this.DATA){
    sum+=Number(item[this.selected2])
    first.push(Number(item[this.selected2]))
    
  }
  console.log(sum)
  console.log(this.DATA.length)
  if (isNaN(sum)){
    // alert('You have to choose a column of numbers a bnadem')
    this.moy="Data must be a number"
    this.Var="Data must be a number"
    this.Ecart="Data must be a number"
  }else {
  this.moy=(sum/ this.DATA.length).toFixed(2)
  console.log(this.moy)
  for(let i=0;i<this.DATA.length;i++){

    S=first[i]-this.moy
    v+=Math.pow(S,2)}

this.Var= v.toFixed(2)
this.Ecart=Math.sqrt(this.Var).toFixed(2)
}

    } 

mode(){
  const mode = {}
  let max:any = 0, count = 0;

  for(let items of this.DATA) {
    const item = Number(items[this.selected2]) ;
    
    if(mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }
    
    if(count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }
    if(isNaN(max)){
     max="Data must be a number"
     return max
    }
  return max;
}


mediane(){
  var first=[]
  for (let item of this.DATA){
    first.push(Number(item[this.selected2]))
  }
  if(isNaN(first[0])){
    this.med="Data must be a number"
  }
  else{

    var l=this.DATA.length

    if(l%2!=0){

      console.log(first[Math.trunc(l/2) -1])
      var a=Math.trunc(l/2)

      this.med=(first[a]).toFixed(2)

    }else {
      this.med=((first[l/2]+first[l/2-1])/2).toFixed(2)


    }
  }
}

maximum(){
  var first=[]
  for (let item of this.DATA){
    first.push(Number(item[this.selected2]))
  }
  if(isNaN(first[0])){
    this.max="Data must be a number"
  }
  else{
  this.max=first[0]
    for(let i=0 ; i<this.DATA.length;i++){
      if(first[i]>this.max){
        this.max=first[i]
      }
    }
  }
}

minimum(){
  var first=[]
  for (let item of this.DATA){
    first.push(Number(item[this.selected2]))
  }
  if(isNaN(first[0])){
    this.min="Data must be a number"
  }
  else{
  this.min=first[0]
    for(let i=0 ; i<this.DATA.length;i++){
      if(first[i]<this.min){
        this.min=first[i]
      }
    }
  }
}

Occurence(){
 
  const counts = {};
  var first=[]
  for (let item of this.DATA){
    first.push(Number(item[this.selected2]))
  }
for (const num of first) {
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}
this.xAxis =(Object.keys(counts)).map(function (x) { 
  return parseFloat(x); 
});
console.log(counts)
this.yAxis= (Object.values(counts));
console.log(this.xAxis,this.yAxis)

}

Show(){
  var toggle=this.isShow
  this.isShow=!toggle
  }
  Line(){
  var toggle=this.isLine
  this.isLine=!toggle
  this.service1.type='line'
  this.isArea=false
  this.isBar=false
  this.isPie=false
  this.isColumn=false
  this.isDemiPie=false
  this.isDount=false
  this.ShowSpinner1=true
  setTimeout(()=>{
    this.ShowSpinner1=false
  },300)
 }
Area(){
  var toggle=this.isArea
  this.isArea=!toggle
  this.isLine=false
  this.isBar=false
  this.isPie=false
  this.isColumn=false
  this.isDemiPie=false
  this.isDount=false
  this.service1.type='area'
  this.ShowSpinner1=true
  setTimeout(()=>{
    this.ShowSpinner1=false
  },300)
  }
  Bar(){
  var toggle=this.isBar
  this.isBar=!toggle
  this.isLine=false
  this.isArea=false
  this.isPie=false
  this.isColumn=false
  this.isDemiPie=false
  this.isDount=false
  this.service1.type='bar'
  this.ShowSpinner1=true
  setTimeout(()=>{
    this.ShowSpinner1=false
  },300)
  }
  Column(){
  var toggle=this.isColumn
  this.isColumn=!toggle
  this.isLine=false
  this.isArea=false
  this.isBar=false
  this.isPie=false
  this.isDemiPie=false

  this.isDount=false
  this.service1.type='column'
  this.ShowSpinner1=true
  setTimeout(()=>{
    this.ShowSpinner1=false
  },300)
  }

  
  Pie(){
    var toggle=this.isPie
    this.isPie=!toggle
    this.isLine=false
    this.isArea=false
    this.isBar=false
    this.isColumn=false
    this.isDemiPie=false
   this.isDount=false
   this.ShowSpinner1=true
   setTimeout(()=>{
     this.ShowSpinner1=false
   },50)

    //Array to objects using lodash ,but it is not working for me, but i keep it for you mariam to see this function maybe you will need it in future inxaellah
    // console.log(_.zipObject(this.Tab1,this.Tab))
    // this.Try=_.zipObject(this.Tab1,this.Tab)
    // console.log(this.Try)
    this.chartOptions1={
         chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        

    },
    title: {
        text: this.selected1 +' par rapport a '+this.selected
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
          size:150,
            dataLabels: {
                enabled: true,
                
                format:'{point.name}:{point.percentage:.1f} %',

            },
            showInLegend: true,
           
        } },
      credits:{
          enabled:false,
        },
  
    series: [{
        name: this.selected,  
        colorByPoint: true,
        data:this.ser
  
    }],
    navigation: {
      buttonOptions: {
          enabled: true
      }
  },
  exporting: {
    enabled: true,
    showTable: false,
    fileName: "line-chart",
    buttons: {
      contextButton: {
        menuItems: ["downloadCSV", "downloadSVG", "downloadPNG", "downloadPDF","downloadJPEG","downloadXLS"]
      }
    }
  }
  }

  }
    
Distribution(){
  // var toggle=this.isDist
  this.isDist=true

  this.chartOptions4={
    chart:{
      width:300
    },
    title:{
      text:this.service.fileName
    },
    xAxis:{
      title:{
        text:this.selected2
      },

      categories:this.xAxis,
      
    },
    yAxis:{
      title:{
        text:'occurence'
      }
    },
    series:[{
      data:this.yAxis,
      type:'line'
    }]}
  
}
chartType(){
  var toggle=this.isChart
  this.isChart=!toggle
  this.isStat=false

}
Statistics(){
  var toggle=this.isStat
  this.isStat=!toggle
  this.isChart=false
}
DemiPie(){
  var toggle=this.isDemiPie
    this.isDemiPie=!toggle
    this.isLine=false
    this.isArea=false
    this.isBar=false
    this.isColumn=false
    this.isPie=false
    this.isDount=false
    this.ShowSpinner1=true
  setTimeout(()=>{
    this.ShowSpinner1=false
  },50)
    this.chartOptions2={
      
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: this.fileName,
        align: 'center',
        verticalAlign: 'middle',
        y: 60
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            
            showInLegend: true,
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: 200
        }
    },
    exporting: {
      enabled: true,
      showTable: false,
      fileName: "line-chart",
      buttons: {
        contextButton: {
          menuItems: ["downloadCSV", "downloadSVG", "downloadPNG", "downloadPDF","downloadJPEG","downloadXLS"]
        }
      }
    },
    series: [{
        type: 'pie',
       
        innerSize: '50%',
        data:this.ser,
    }]
   
    
 
  }}

Dount(){
  var toggle=this.isDount
  this.isDount=!toggle
  this.isLine=false
  this.isArea=false
  this.isBar=false
  this.isColumn=false
  this.isPie=false
  this.isDemiPie=false
  this.ShowSpinner1=true
  setTimeout(()=>{
    this.ShowSpinner1=false
  },50)
  this.chartOptions3={
    chart: {
      type: 'pie',
      options3d: {
          enabled: true,
          alpha: 45
      }
  },
  title: {
      text: this.fileName
  },
 
  plotOptions: {
      pie: {
          innerSize: 100,
          depth: 45,
          showInLegend: true,
          size:150,
         
      },
     
  },
  exporting: {
    enabled: true,
    showTable: false,
    fileName: "line-chart",
    buttons: {
      contextButton: {
        menuItems: ["downloadCSV", "downloadSVG", "downloadPNG", "downloadPDF","downloadJPEG","downloadXLS"]
      }
    }
  },
  series: [{
   
      data:this.ser,
      sliced: true,
      selected: true

  }]
}
}


public PDF =(charts :any)=>{
  switch(charts){
    case "DemiPie":
      this.DemiPieChart.chart.exportChart({
        type: "application/pdf",
        filename:'Demi_pie-chart '+ this.fileName
      });
      break;
      case "DountChart":
        this.Dounatchart.chart.exportChart({
          type: "application/pdf",
          filename: this.fileName+' Dount-chart'
        });
        break;
        case "PieChart":
          this.Piechartt.chart.exportChart({
            type: "application/pdf",
            filename: this.fileName+' Pie-chart'
          });
          break;
         
  }

// }
// public export = (type: any) => {
//   switch (type) {
//     case "pdf":
//       this.lineChart.chart.exportChart({
//         type: "application/pdf",
//         filename:'Dount-chart'+this.fileName
//       });
//       break;
//     case "png":
//       this.lineChart.chart.exportChart({
//         type: "image/png",
//         filename: "line-chart"
//       });
//       break;
//     case "jpeg":
//       this.lineChart.chart.exportChart({
//         type: "image/jpeg",
//         filename: "line-chart"
//       });
//       break;
//     case "csv":
//       this.lineChart.chart.downloadCSV();
//       break;
//     case "excel":
//       this.lineChart.chart.downloadXLS();
//       break;
//     case "svg":
//       this.lineChart.chart.exportChart({
//         type: "image/svg+xml",
//         filename: "line-chart"
//       });
//       break;
//   }
// }
}
// public export1 = (type: any) => {
//   switch (type) {
//     case "pdf":
//       this.DemiPieChart.chart.exportChart({
//         type: "application/pdf",
//         filename: "Demi-pie-chart"
//       });
//       break;
//     case "png":
//       this.DemiPieChart.chart.exportChart({
//         type: "image/png",
//         filename: "line-chart"
//       });
//       break;
//     case "jpeg":
//       this.DemiPieChart.chart.exportChart({
//         type: "image/jpeg",
//         filename: "line-chart"
//       });
//       break;
//     case "csv":
//       this.DemiPieChart.chart.downloadCSV();
//       break;
//     case "excel":
//       this.DemiPieChart.chart.downloadXLS();
//       break;
//     case "svg":
//       this.DemiPieChart.chart.exportChart({
//         type: "image/svg+xml",
//         filename: "line-chart"
//       });
//       break;
//   }
// }

  }