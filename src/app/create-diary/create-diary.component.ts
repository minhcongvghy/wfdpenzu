import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {DiaryService} from '../services/diary.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../services/tag';
import {TagService} from '../services/tag.service';
import {Diary} from '../services/diary';

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss']
})
export class CreateDiaryComponent implements OnInit {

  info: any;
  fileUpload: File;
  public tagList: Tag[] = [];
  formDiary = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    tagId: new FormControl(''),
  });

  constructor(private token: TokenStorageService,
              private diaryService: DiaryService,
              private tagService: TagService) { }

  ngOnInit() {

    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
        console.log(this.tagList);
      }, error => {
        alert('error get tag');
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
    console.log(this.info);
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
  }

  createDiary() {
    const {title, description, content, tagId} = this.formDiary.value;

    const diary: Diary = {
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

    console.log(diary);
    this.diaryService.createDiary(diary).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        console.log(form);
        this.diaryService.uploadFile(form, result.id).subscribe(
          next => {
            console.log('create diary ok');
          }, error => {
            return console.log('upload file fail');
          }
        );
      }, error => {
        return console.log('fail create diary');
      }
    );
  }
}
