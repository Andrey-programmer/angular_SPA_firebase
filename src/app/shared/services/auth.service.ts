import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthentificated = false;

  login() {
    this.isAuthentificated = true;
  }

  logout() {
    this.isAuthentificated = false;
    window.localStorage.clear(); // - очищаем историю cookie
  }

  isLoggedIn(): boolean {
    return this.isAuthentificated;
  }

  constructor() { }
}
