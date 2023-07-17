import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from 'src/app/services/authenciation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  

  constructor( private router: Router , private service:AuthencationService) { }

  ngOnInit(): void {
  
  }


  signup(f:any){
    let data = f.value
    this.service.signup(data.email , data.password)
    .then((response) =>{
      this.router.navigateByUrl('main');
      
    })
    .catch((err)=>{
      alert(err.message)
    })
  
}
}
