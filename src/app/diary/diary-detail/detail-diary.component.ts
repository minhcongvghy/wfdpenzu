import {Component, HostListener, OnInit, Pipe} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Diary} from '../../model/diary';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {DiaryService} from '../../services/diary.service';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {Comment} from '../../model/comment';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-detail-diary',
  templateUrl: './detail-diary.component.html',
  styleUrls: ['./detail-diary.component.scss']
})

export class DetailDiaryComponent implements OnInit  {
  private diaryId: string;
  userId: string;
  diary: Diary;
  currentRate = 6;
  isShow: boolean;
  topPosToStartShowing = 200;
  formCommentCreate = new FormGroup( {
    contentInput: new FormControl('')
  });
  contentUpdate = new FormControl();
  private listComment: Comment[] = [];
  private idComment: string;
  private tokenJWT: string;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private diaryService: DiaryService,
              private sanitizer: DomSanitizer,
              private commentService: CommentService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.diaryId = params.id;
    });

    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit() {
    console.log(this.diaryId, this.token.getUserId());
    this.getDiaryById();
    this.getAllCommentThisDiary();
    this.gotoTop();
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
    this.commentService.getAllCommentByDiaryId(this.diaryId).subscribe(
      result => {
        this.listComment = result;
      }, error => {
        console.log(error);
      }
    );
  }

  createComment() {
    const {contentInput} = this.formCommentCreate.value;
    if (contentInput === '' || contentInput === null || contentInput === undefined) {
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
        this.formCommentCreate.reset();
        this.getAllCommentThisDiary();
      }, error => {
        console.log(error);
      }
    );
  }

  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentThisDiary();
    this.contentUpdate.reset();
  }

  updateComment(commentId: string, closeModalRef: HTMLAnchorElement) {
    if (this.contentUpdate.value === null || this.contentUpdate.value === '' || this.contentUpdate.value == undefined) {
      return this.closeForm(closeModalRef);
    }
    const comment: Comment = {
      id: commentId ,
      content: this.contentUpdate.value
    };
    this.commentService.editComment(comment).subscribe(
        result => {
          this.closeForm(closeModalRef);
        }, error => {
          console.log(error);
      }
      );
    console.log(comment);
  }

  getIdComment(id: string) {
    this.idComment = id;
  }

  deleteComment(closeModalRef2: HTMLButtonElement) {
      this.commentService.deleteComment(this.idComment).subscribe(
        result => {
          this.getAllCommentThisDiary();
          closeModalRef2.click();
        }, error => {
          console.log(error);
        }
      );
  }
}
