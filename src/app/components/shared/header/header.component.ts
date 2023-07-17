import { Component, OnInit } from '@angular/core'
import { AuthencationService } from 'src/app/services/authenciation.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUser= false
  constructor(
    private service: AuthencationService
  ) 
  {
  }
  
  ngOnInit(): void {
    if(sessionStorage.getItem('user')!== null)
        this.isUser= true
    else
    
        this.isUser = false
  }
  logout(){
    this.service.logout();
  }

}
