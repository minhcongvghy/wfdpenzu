import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  private previewId: string;
  tagId = '';

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router) {
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

  updateDiary(closeButton: HTMLInputElement) {

    if (this.diary.title === '' || this.diary.description === '' || this.diary.content === '') {
      return alert('Fill Data Fields !');
    }

    if (this.tagId === '') {
      this.tagId = this.diary.tag.id;
    }

    const diary: Diary = {
      id: this.diary.id,
      title: this.diary.title,
      description: this.diary.description,
      content: this.diary.content,
      user: {
        id: this.info.userId
      },
      tag: {
        id: this.tagId
      }
    };

    this.diaryService.updateDiary(diary).subscribe(
      result => {
        console.log('ok');
        this.previewId = result.id;
        closeButton.click();
      }, error => {
        console.log(error);
      }
    );
  }

  preview(previewId: any, closeModalRef1: HTMLButtonElement) {
    closeModalRef1.click();
    return this.router.navigateByUrl('/blog/' + previewId);
  }
}
