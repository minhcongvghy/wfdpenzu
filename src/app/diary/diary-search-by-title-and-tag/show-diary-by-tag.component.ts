import {Component, HostListener, OnInit} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../model/tag';
import {Diary} from '../../model/diary';
import {SearchDiaryByTagAndTitle} from '../../model/search-diary-by-tag-and-title';
import {DiaryService} from '../../services/diary.service';
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
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getListTag();
    if (this.id === '0') {
      this.searchDiary();
    } else {
    this.getListDiaryByTagId(this.id);
    }

    this.gotoTop();
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
