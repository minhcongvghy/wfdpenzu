import {Component, OnInit, Pipe} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Diary} from '../services/diary';
import {TokenStorageService} from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {DiaryService} from '../services/diary.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-detail-diary',
  templateUrl: './detail-diary.component.html',
  styleUrls: ['./detail-diary.component.scss']
})

export class DetailDiaryComponent implements OnInit  {
  private id: string;
  diary: Diary;
  currentRate = 6;
  ImgURL = environment.imgUrl;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private sanitizer: DomSanitizer) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    console.log(this.id);

    this.diaryService.findDiaryById(this.id).subscribe(
      result => {
        this.diary = result;
        console.log(this.diary);
        console.log('Get diary success');
      }, error => {
        console.log('Fail get diary');
      }
    );
  }

}
