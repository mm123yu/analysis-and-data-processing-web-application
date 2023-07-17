import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { faPaste, faTrashCan , } from '@fortawesome/free-regular-svg-icons'
import {
  faUpload,
  faFile,
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons'
import { FileUploadService } from 'src/app/services/file-upload.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { PopupComponent } from '../popup/popup.component'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  isPopupOpened = true
  @ViewChild('fileDropRef', { static: false }) fileDropEl!: ElementRef //== input (false , we can use it in ngOnInit)
  //== input (false , we can use it in ngOnInit)
  files: any[] = [] // liste des fichiers pour les afficher dans l'interface
  data: any[] = []
  data1 = []
  headers = []
  isHeader: boolean | undefined
  step2 = false

   // icons
   pasteicon = faPaste
   uploadicon = faUpload
   deleteicon = faTrashCan
   fileicon = faFile
   righticon = faArrowRight
  constructor(
    private csv2fire: FileUploadService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    //public storage: Storage  ,
  }
 

  ngOnInit(): void {}

  openDialog() {
    const file: File = this.files[0]
    console.log(file.name)
    if(!file)
      alert('No File Added !')
    else if (!(file.name.split('.').pop() === 'csv'))
    alert('Your file type should be CSV!')
    else {
   
      const dialogConfig = new MatDialogConfig()

      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true

      // this.dialog.open(PopupComponent, dialogConfig);
      const dialogRef = this.dialog.open(PopupComponent, dialogConfig)

      this.router.events.subscribe(() => {
        dialogRef.close()
      })
      dialogRef.afterClosed().subscribe(() => {
        this.csv2fire.table(this.files[0])
      })
    } 
  }

  onFileDropped($event: any[]) {
    // console.log($event) // kt3tina FileList {0:File1,1:File2} w File 3ndo les proprietes dyalo
    this.prepareFilesList($event)
    const file: File = this.files[0]
    console.log(file.name)
    this.csv2fire.setFileName(file.name);
    console.log('type', file.type)
  }

  fileBrowseHandler(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files
      this.prepareFilesList(file)
      this.csv2fire.setFileName(file[0].name);
    }
  }

  prepareFilesList(files: Array<any>) {
    // Filelist {0: File1 , 1:File2} => array of files [File1 , File2]
    for (const item of files) {
      // item.progress = 0
      this.files.push(item)
    }
  }

  fire() {
    // click sur proceder
    const file: File = this.files[0]
    console.log(file.name)
    if(!file)
      alert('No File Added !')
    else if (!(file.name.split('.').pop() === 'csv'))
    alert('Your file type should be CSV!')
    else {
      this.csv2fire.process(this.files[0], this.files[0].name)
      setTimeout(
        () => {
          // console.log(this.csv2fire.getData())
          this.headers = this.csv2fire.getHeaders()
          this.data = this.csv2fire.data
          // this.csv2fire.getDataFire(this.files[0].name).subscribe(data => this.data = data)
          this.step2 = true
        },
        2000, //5ms
      )}
    // } else {
    //   alert('Pas de fichier ajoute !')
    // }
  }

  // getHeaders(){
  //   this.headers = this.csv2fire.getHeaders();
  //   if(this.headers != [])
  //     return true
  //   return false
  // }

  deleteFile(index: number) {
    this.files.splice(index, 1)
  }

  /**
   * Simulate the upload process
   */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval)
  //           this.uploadFilesSimulator(index + 1)
  //         } else {
  //           this.files[index].progress += 5
  //         }
  //       }, 200)
  //     }
  //   }, 1000)
  // }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes'
    }
    const k = 1024
    const dm = decimals <= 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }
}
