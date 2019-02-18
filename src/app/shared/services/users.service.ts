import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from '../core/base-api';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseApi {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
/*
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:3000/users?email=${email}`, {
      responseType: 'json'
    }).map((user) => user[0] ? user[0] : undefined);
  }
 */

loginUser(user: User): Observable<any> {
  delete user.name
  delete user.id
  const userLogin = Object.assign(user, {returnSecureToken: true}) 
  // console.log(userReg)

  return this.httpClient.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyABVGaiU0p-ltWe0yHacLbn6ONQIDqtXGc', userLogin)
  // return this.get(`users?email=${email}`).map((user) => user[0] ? user[0] : undefined);
}

 /*  createNewUser(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/users', user, {
      responseType: 'json'
    });
  } */

  createNewUser(user: User): Observable<any> {
    // delete user.name
    delete user.id
    const userReg = Object.assign(user, {
      returnSecureToken: true,
      displayName: user.name
    }) 
    // console.log(userReg)
    
    return this.httpClient.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyABVGaiU0p-ltWe0yHacLbn6ONQIDqtXGc', userReg)
    // return this.post('users', user);
  }
}
