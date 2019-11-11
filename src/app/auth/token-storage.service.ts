import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getUserId(): string {
    return sessionStorage.getItem(ID_KEY);
  }

  public saveUserId(userId: string) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, userId);
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      try {
        JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
          this.roles.push(authority.authority);
        });
      } catch (e) {
        console.log(e);
      }
    }

    return this.roles;
  }
}
