import { Component, OnInit } from '@angular/core';
import { AuthencationService } from 'src/app/services/authenciation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageError = '';
  
  constructor( private service :AuthencationService, private router : Router) { }

  ngOnInit(): void {
  }

  login(f: any){
    let data = f.value
    this.service.signin(data.email , data.password).then(()=>{
      this.router.navigate(['main'])
    }).catch((err)=>{
      this.messageError = err
    })

  }

}
