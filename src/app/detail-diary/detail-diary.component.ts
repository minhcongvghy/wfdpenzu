import {Component, HostListener, OnInit, Pipe} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Diary} from '../services/diary';
import {TokenStorageService} from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {DiaryService} from '../services/diary.service';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {Comment} from '../services/comment';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-detail-diary',
  templateUrl: './detail-diary.component.html',
  styleUrls: ['./detail-diary.component.scss']
})

export class DetailDiaryComponent implements OnInit  {
  private diaryId: string;
  diary: Diary;
  currentRate = 6;
  ImgURL = environment.imgUrl;
  isShow: boolean;
  topPosToStartShowing = 200;
  formComment = new FormGroup( {
    contentInput: new FormControl('')
  });
  listComment: Comment[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private sanitizer: DomSanitizer,
              private commentService: CommentService) {
    this.activatedRoute.params.subscribe(params => {
      this.diaryId = params.id;
    });
  }

  ngOnInit() {
    console.log(this.diaryId, this.token.getUserId());
    this.getDiaryById();
    this.getAllCommentThisDiary();

  }

  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop
    // returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getDiaryById() {
    this.diaryService.findDiaryById(this.diaryId).subscribe(
      result => {
        this.diary = result;
        console.log(this.diary);
        console.log('Get diary success');
      }, error => {
        console.log('Fail get diary');
      }
    );
  }

  getAllCommentThisDiary() {
    this.commentService.getAllCommentByDiary(this.diaryId).subscribe(
      result => {
        this.listComment = result;
      }, error => {
        console.log(error);
      }
    );
  }

  createComment() {
    const {contentInput} = this.formComment.value;
    if (contentInput === '') {
      return;
    }
    const comment: Comment = {
      idDiary: this.diaryId,
      content: contentInput,
      user: {
        id: this.token.getUserId()
      }
    };
    this.commentService.createComment(comment).subscribe(
      result => {
        console.log(result , 'ok');
        this.formComment.reset();
        this.getAllCommentThisDiary();
      }, error => {
        console.log(error);
      }
    );
  }
}
