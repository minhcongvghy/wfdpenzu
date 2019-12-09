import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../model/tag';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  tagList: Tag[] = [];
  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getListTag();
  }
  getListTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }, error => {
        console.log(error);
      }
    );
  }
}
