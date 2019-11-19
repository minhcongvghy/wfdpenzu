import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from '../auth/token-storage.service';
import {DiaryService} from '../services/diary.service';
import {Diary} from '../services/diary';
import {TagService} from '../services/tag.service';
import {Tag} from '../services/tag';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-diary',
  templateUrl: './update-diary.component.html',
  styleUrls: ['./update-diary.component.scss']
})
export class UpdateDiaryComponent implements OnInit {
  private idParam: any;
  diary: Diary;
  private tagList: Tag[];
  private info: any;
  formDiary = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    tagId: new FormControl(''),
  });

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private tagService: TagService) {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params.id;
    });
  }

  ngOnInit() {
    this.diaryService.findDiaryById(this.idParam).subscribe(
      result => {
        this.diary = result;
        console.log(this.diary);
      }, error => {
        console.log(error);
      }
    );

    this.tagService.getTagList().subscribe(
    result => {
      this.tagList = result;
      }, error => {
      console.log(error);
      }
    );

    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getEmail()
    };
  }

  updateDiary() {
    const {title, description, content, tagId} = this.formDiary.value;
    console.log(this.formDiary);

    const diary: Diary = {
      id: this.idParam,
      title,
      description,
      content,
      user: {
        id: this.info.userId
      },
      tag: {
        id: tagId
      }
    };

    this.diaryService.updateDiary(diary).subscribe(
      result => {
        console.log('ok');
      }, error => {
        console.log(error);
      }
    );
  }
}
