import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _auth : AuthService, 
    private _router : Router
    ){} 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._auth.isLoggedIn()){
        if(route.url.length > 0){
          let menu = route.url[0].path;
          if(menu == 'userList'){
            if(this._auth.getUserRole()=='admin'){
              return true;
            }else{
              alert('You dont have access');
              this._router.navigate([''])
              return false;
            }
          }else{
            return true;
          }
        }else{
          return true;
        }
      }else{
        this._router.navigate(['/login'])
        return false;
      }
  }
  
}
