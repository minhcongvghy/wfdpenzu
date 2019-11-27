import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from './auth-login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignUpInfo} from './sign-up-info';
import {UserForm} from '../profile-user/user-form';
import {PassForm} from '../profile-user/pass-form';
import {environment} from '../../environments/environment';
// import {environment} from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // local
  private loginUrl = environment.loginUrl;
  private signupUrl = environment.signupUrl;
  private updateProfileUrl = environment.updateProfileUrl;
  private updatePasswordUrl = environment.updatePasswordUrl;

  // server
  // private svLoginUrl = environment.SvLoginUrl;
  // private svSignUpUrl = environment.SvSignupUrl;
  // private svUpdateProfileUrl = environment.SvUpdateProfileUrl;
  // private svUpdatePasswordUrl = environment.SvUpdatePasswordUrl;

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  updateUser(infor: UserForm): Observable<string> {
    return this.http.put<string>(this.updateProfileUrl + '/' + infor.id , infor);
  }

  updatePassword(passForm: PassForm): Observable<string> {
    return this.http.put<string>(this.updatePasswordUrl + '/' + passForm.id , passForm);
  }
}
