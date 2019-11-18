import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {Diary} from '../services/diary';

@Component({
  selector: 'app-user-diary-list',
  templateUrl: './user-diary-list.component.html',
  styleUrls: ['./user-diary-list.component.scss']
})
export class UserDiaryListComponent implements OnInit {

  listDiary: Diary[] = [];
  constructor(private token: TokenStorageService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getDiaryByUser(this.token.getUserId()).subscribe(
      result => {
        this.listDiary = result;
        console.log(this.listDiary);
      }, error => {
        alert('error get diary');
      }
    );
  }

}
