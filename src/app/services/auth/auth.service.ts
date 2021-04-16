import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router , private fauth: AngularFireAuth ) { }
  canActivate(route: ActivatedRouteSnapshot){
   let logs = localStorage.getItem('userID');
   console.log(logs)
   if(logs){
    return true ;
   }else {
     this.router.navigate(['/login'])
   }
 
  }
}
