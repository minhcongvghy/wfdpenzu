import { Component, OnInit } from '@angular/core';
import {Diary} from '../services/diary';
import {DiaryService} from '../services/diary.service';
import {Pagination} from '../services/pagination';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.scss']
})
export class BlogMainComponent implements OnInit {
  diaryList: Diary[] = [];
  page = 0;
  loadText = 'Load More';
  constructor(private diaryService: DiaryService) {
  }

  ngOnInit() {
    this.Pagination(this.page);
  }

  Pagination(page: number) {
    this.diaryService.Pagination(page).subscribe(
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

  loadMore() {
    console.log(this.page);
    this.diaryService.Pagination(this.page).subscribe(
      result => {
        console.log(result);
        if (result == null) {
          return this.loadText = 'Out of Blog';
        } else {
          this.diaryList = this.diaryList.concat(result.content);
          console.log(this.diaryList);
          this.page++ ;
          console.log(result.content);
        }
      }, error => {
        console.log('loi');
      }
    );
  }

}
