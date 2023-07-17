import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import * as Papa from 'papaparse'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  csv_rec: any = []
  isHeader!: boolean
  headers: any = []
  data: any = []
  fileName!: string
  constructor(private afs: AngularFirestore) {}

  table(file: any) {
    Papa.parse(file, {
      complete: (res) => {
        this.csv_rec = res
        console.log(res)
        console.log(this.csv_rec['data']) // array fiha les donnees [ { first row},{second row} .....] / [[],[],[]]  (header false pu true)

        this.data = this.csv_rec['data']
        if (this.isHeader == true) {
          this.headers = res.meta['fields'] // Object.keys(arr[0]) ;
          console.log(this.headers)
        }
      },
      header: this.isHeader,
    })
  }

  process(file: any, collection: string) {
    Papa.parse(file, {
      complete: (res) => {
        this.csv_rec = res
        this.fileName = collection
        console.log(this.csv_rec)
        const arr = _.values(this.csv_rec['data']) // array fiha les donnees [ { first row},{second row} .....]
        console.log(arr)
        this.data = arr
        this.headers = res['fields'] // Object.keys(arr[0]) ;
        console.log(this.headers)
        this.firethis(this.csv_rec['data'], collection)
      },
      header: this.isHeader,
    })
  }

  getData() {
    return this.data
  }

  firethis(json: any, collection: string) {
    // const res =(_.values(json));  // array fiha les donnees [ { first row},{second row} .....]
    // this.headers = Object.keys(res[0]) ;  // array fiha headers
    return new Promise<void>((resolve) => {
      _.map(json, (e: any, i: any) => {
        _.keys(e).map(() => {
          this.afs
            .collection(collection)
            .doc('doc' + i)
            .set(e)
        })
      })
      resolve()
    })
  }

  getHeaders() {
    return this.headers
  }
  setFileName(name: string) {
    this.fileName = name
  }

  getFileName(){
    return this.fileName
  }

  getDataFire(fileName: string) {
    // get data from firestore
    // return this.afs.collection("usename.csv").snapshotChanges();
    return this.afs.collection(fileName).valueChanges()
  }
}
