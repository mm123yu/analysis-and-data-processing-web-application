import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthencationService } from './authenciation.service';

@Injectable({
  providedIn: 'root'
})
export class NoGuardService implements CanActivate {

  constructor(private as:AuthencationService,private route:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(resolve=>{
      this.as.user.subscribe((user)=>{
        if(!user)
        {
          resolve(true)
        }else {
          this.route.navigate([''])
          resolve(false)
        }
      })
    })
  }
}
