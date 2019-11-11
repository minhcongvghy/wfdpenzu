import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/auth-login-info';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SignUpInfo} from '../auth/sign-up-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  info: any;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  signUpForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword:  new FormControl('')
  });
  isSignUpFailed = false;
  isSignUp = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  message = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId()
    };

    console.log(this.info);
  }
  reloadPage() {
    window.location.reload();
  }

  signIn() {
    console.log(this.loginForm);
    const {username , password} = this.loginForm.value;

    const authLoginInfo = new AuthLoginInfo(username, password);

    this.authService.attemptAuth(authLoginInfo).subscribe(
      data => {
        this.token.saveToken(data.accessToken);
        this.token.saveUsername(data.username);
        this.token.saveAuthorities(data.roles);
        this.token.saveUserId(data.id);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getAuthorities();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  signUp() {
    const {name , username , email , password , confirmPassword} = this.signUpForm.value;
    if ( password !== confirmPassword) {
      this.isSignUpFailed = true;
      return this.errorMessage = 'Password not correct !';
    }

    const signUpInfoForm = new SignUpInfo(name, username, email, password);

    this.authService.signUp(signUpInfoForm).subscribe(
      result => {
        this.isSignUpFailed = false;
        this.isSignUp = true;
        this.message = 'Register Successful';
      }, error => {
        console.log(error);
        this.isSignUpFailed = true;
        this.errorMessage = error.error.message;
      }
    );
  }



  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
