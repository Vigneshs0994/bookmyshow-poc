import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<String | null> = new BehaviorSubject<String | null>(null);
  private jwtHelper = new JwtHelperService();
 username!:string;
  currentUsername: void | undefined;

  loadUserFromToken() {
    const token = localStorage.getItem('token');
    this.userSubject.asObservable();

    if (token && !this.jwtHelper.isTokenExpired(token)) { 
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken)
      console.log(decodedToken.name+" -- "+decodedToken.username+" --pas--"+decodedToken.password)
       this.username = decodedToken.username;
       this.currentUsername = this.userSubject.next(this.username);
    }
  }

  IsLoggedIn(){
     return localStorage.getItem('token')!=null;
  }

  getCurrentUser(): String | null {
  
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

 }
