import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-album-home',
  templateUrl: './album-home.component.html',
  styleUrls: ['./album-home.component.scss']
})
export class AlbumHomeComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 200;
  constructor() { }

  ngOnInit() {
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
}
