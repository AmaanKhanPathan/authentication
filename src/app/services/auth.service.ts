import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl : string = 'http://localhost:3000/users'

  constructor(private _http : HttpClient) { }

  getAll():Observable<any>{
    return this._http.get(this.apiUrl)
  }

  getAllRole(){
    return this._http.get('http://localhost:3000/role');
  }

  getByCode(code:any):Observable<any>{
    return this._http.get(this.apiUrl+'/'+code)
  }
  proceedRegister(inputData:any):Observable<any>{
    return this._http.post(this.apiUrl,inputData)
  }

  updateUser(code : any, inputData : any):Observable<any>{
    return this._http.put(this.apiUrl+'/'+code, inputData)
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')!=null
  }

  getUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():'';
  }

  getAllCustomers():Observable<any>{
    return this._http.get(' http://localhost:3000/customers')
  }

  getAccessByUserRole(role:any,menu:any){
    return this._http.get('http://localhost:3000/roleAccess?role='+role+'&menu='+menu)
  }

}
