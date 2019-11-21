import { Component, OnInit } from '@angular/core';
import {Diary} from '../services/diary';
import {DiaryService} from '../services/diary.service';

@Component({
  selector: 'app-blog-main',
  templateUrl: './blog-main.component.html',
  styleUrls: ['./blog-main.component.scss']
})
export class BlogMainComponent implements OnInit {
  diaryList: Diary[] = [];

  constructor(private diaryService: DiaryService) {
    diaryService.getDiaryList().subscribe(
      result => {
        this.diaryList = result;
      }
    );
  }

  ngOnInit() {
  }

}
