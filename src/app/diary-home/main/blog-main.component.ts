import { Component, OnInit } from '@angular/core';
import {Diary} from '../../model/diary';
import {DiaryService} from '../../services/diary.service';
import {Pagination} from '../../model/pagination';

const STATUS_KEY_DIARY = 'Status';
const TEXT_KEY_DIARY = 'text';
@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.scss']
})
export class BlogMainComponent implements OnInit {
  diaryList: Diary[] = [];
  page = 0;
  loadText = 'Load More';
  isNew = 'true';
  sort = 'true';
  textStatus = '';

  constructor(private diaryService: DiaryService) {
    this.sort = window.sessionStorage.getItem(STATUS_KEY_DIARY);
    if (window.sessionStorage.getItem(TEXT_KEY_DIARY) != null) {
      this.textStatus = window.sessionStorage.getItem(TEXT_KEY_DIARY);
    }
    console.log(this.sort);
  }

  ngOnInit() {
    this.Pagination(this.page);
  }

  sortDiaryByDate() {
    console.log(this.isNew);
    if (this.isNew === undefined || this.isNew === null ) {
          return;
    }
    if (this.isNew === 'true') {
      window.sessionStorage.removeItem(TEXT_KEY_DIARY);
      window.sessionStorage.setItem(TEXT_KEY_DIARY, 'Newest');
    } else if ( this.isNew === 'false' ) {
      window.sessionStorage.removeItem(TEXT_KEY_DIARY);
      window.sessionStorage.setItem(TEXT_KEY_DIARY, 'Oldest');
    }
    window.sessionStorage.removeItem(STATUS_KEY_DIARY);
    window.sessionStorage.setItem(STATUS_KEY_DIARY, this.isNew);
    window.location.reload();
  }

  Pagination(page: number) {

    if (this.sort == null || this.sort === 'true') {
    this.diaryService.getListDiaryAndPaginationDESC(page).subscribe(
      result => {
        if (result === null) {
          return;
        } else {
        this.diaryList = result.content;
        this.page++ ;
        }
      }
    );
    } else if (this.sort === 'true') {
      this.diaryService.getListDiaryAndPaginationASC(page).subscribe(
        result => {
          if (result === null) {
            return;
          } else {
            this.diaryList = result.content;
            this.page++ ;
          }
        }
      );
    }
  }

  loadMore() {
    console.log(this.page);
    if (this.sort == null || this.sort === 'true') {
      this.diaryService.getListDiaryAndPaginationASC(this.page).subscribe(
        result => {
          console.log(result);
          if (result == null) {
            return this.loadText = 'Out of Blog';
          } else {
            this.diaryList = this.diaryList.concat(result.content);
            console.log(this.diaryList);
            this.page++;
            console.log(result.content);
          }
        }, error => {
          console.log('loi');
        }
      );
    } else {
      this.diaryService.getListDiaryAndPaginationDESC(this.page).subscribe(
        result => {
          console.log(result);
          if (result == null) {
            return this.loadText = 'Out of Blog';
          } else {
            this.diaryList = this.diaryList.concat(result.content);
            console.log(this.diaryList);
            this.page++;
            console.log(result.content);
          }
        }, error => {
          console.log('loi');
        }
      );
    }
  }

}
