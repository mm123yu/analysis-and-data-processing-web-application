import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthencationService } from './authenciation.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private as:AuthencationService , private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   return new Promise(resol=>{
 this.as.user.subscribe((user)=>{
   if(user){
     resol(true)
   }
   else{
     this.router.navigate(['login'])
     resol(false)
   }
 })
   })
  }
}
