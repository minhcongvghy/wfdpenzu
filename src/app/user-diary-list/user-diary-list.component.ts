import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {Diary} from '../services/diary';
import {DiaryService} from '../services/diary.service';
import {SearchDiaryByTitleAndUserId} from '../services/search-diary-by-title-and-user-id';

@Component({
  selector: 'app-user-diary-list',
  templateUrl: './user-diary-list.component.html',
  styleUrls: ['./user-diary-list.component.scss']
})
export class UserDiaryListComponent implements OnInit {

  title: '';
  diaryId: string;
  listDiary: Diary[];
  constructor(private token: TokenStorageService,
              private userService: UserService,
              private diaryService: DiaryService) { }

  ngOnInit() {
    this.getDiaryList();
  }

  getDiaryList() {
    this.userService.getDiaryByUser(this.token.getUserId()).subscribe(
      result => {
        this.listDiary = result;
        console.log(this.listDiary);
      }, error => {
        alert('error get diary');
      }
    );
  }

  getDiaryId(id: string) {
    this.diaryId = id;
  }

  searchByTitle() {
    const searchForm: SearchDiaryByTitleAndUserId = {
      title: this.title,
      id: this.token.getUserId()
    };
    this.diaryService.searchDiaryByTitleAndUserID(searchForm).subscribe(
      result => {
        this.listDiary = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

  deleteDiaryById(closeButton: HTMLInputElement) {
    this.diaryService.deleteDiaryById(this.diaryId).subscribe(
      result => {
        closeButton.click();
        this.getDiaryList();
      }, error => {
        console.log(error);
      }
    );
  }



}
