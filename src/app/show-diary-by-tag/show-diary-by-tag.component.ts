import {Component, HostListener, OnInit} from '@angular/core';
import {TagService} from '../services/tag.service';
import {Tag} from '../services/tag';
import {Diary} from '../services/diary';
import {SearchDiaryByTagAndTitle} from '../services/search-diary-by-tag-and-title';
import {DiaryService} from '../services/diary.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-show-diary-by-tag',
  templateUrl: './show-diary-by-tag.component.html',
  styleUrls: ['./show-diary-by-tag.component.scss']
})
export class ShowDiaryByTagComponent implements OnInit {
  listTag: Tag[] = [];
  ListDiary: Diary[] = [];
  tagId = null;
  title = null;
  private id: string;
  isShow: boolean;
  topPosToStartShowing = 200;
  constructor(private tagService: TagService,
              private diaryService: DiaryService,
              private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.getListTag();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getListDiaryByTagId(this.id);
  }

  getListDiaryByTagId(id: string) {
    if (this.id == null) {
      return;
    } else {
      this.diaryService.searchDiaryByTagId(this.id).subscribe(
        result => {
          this.ListDiary = result;
          this.id = null;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  getListTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.listTag = result;
      }, error => {
        console.log(error);
      }
    );
  }

  searchDiary() {
    const searchForm: SearchDiaryByTagAndTitle = {
      tagId: this.tagId,
      title: this.title
    };
    this.diaryService.searchDiaryByTagAndTitle(searchForm).subscribe(
      result => {
        this.ListDiary = result;
      }, error => {
        console.log(error);
      }
    );
  }

  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop
    // returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);

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

}