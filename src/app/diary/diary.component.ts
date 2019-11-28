import { Component, OnInit } from '@angular/core';
import {Token} from '@angular/compiler';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  private info: any;

   constructor(private token: TokenStorageService) {}


  ngOnInit() {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId()
    };
  }

}
