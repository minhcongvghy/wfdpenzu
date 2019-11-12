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
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId()
    };

    console.log(this.info);
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
