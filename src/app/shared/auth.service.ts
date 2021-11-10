import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  noauthHeader = {
    headers : new HttpHeaders({'NoAuth' :'True'})
  }

  adminPageActive :boolean =false;
  builderPageActive:boolean = false;
  archPageActive:boolean = false;


  constructor(private http : HttpClient,
      private _global : GlobalService
    ) { }

  registerUser(user:User){
    return this.http.post<any>('http://localhost:3000/userapi/register',user,this.noauthHeader)
  }

  loginUser(user:User){
    return this.http.post<any>('http://localhost:3000/userapi/login',user,this.noauthHeader);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  setToken(token :string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token')
  }

  deleteToken(){
    localStorage.removeItem('token')
  }

  logoutUser(){
    this.deactivatedPages();
    this.deleteToken();
  }

  deactivatedPages(){
    this.adminPageActive  =false;
    this.builderPageActive = false;
    this.archPageActive = false;
  }

  getUserPayload(){
    console.log("get USer Payload")
    var token = localStorage.getItem('token')
    if(token){
      var userPayload = window.atob(token.split('.')[1])
      return JSON.parse(userPayload)
    }
    else {
      return null
    }
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload){
      return userPayload.exp > Date.now() /1000;
    }else{
      return false
    }
  }

  getUserProfile(userId){
    console.log(userId)
    return this.http.get('http://localhost:3000/userapi/userprofile/' + userId);
  }


}
