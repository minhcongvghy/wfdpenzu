import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detail-diary',
  templateUrl: './detail-diary.component.html',
  styleUrls: ['./detail-diary.component.scss']
})
export class DetailDiaryComponent implements OnInit {
  private id: any;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.videoId;
    });
  }

  ngOnInit() {
  }

}
