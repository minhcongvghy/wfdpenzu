import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {DiaryService} from '../../services/diary.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../model/tag';
import {TagService} from '../../services/tag.service';
import {Diary} from '../../model/diary';
import {ActivatedRoute, Router} from '@angular/router';
import {error} from 'util';

@Component({
  selector: 'app-create-diary',
  templateUrl: './create-diary.component.html',
  styleUrls: ['./create-diary.component.scss']
})
export class CreateDiaryComponent implements OnInit {

  info: any;
  fileUpload: File;
  previewId: string;
  public tagList: Tag[] = [];
  formDiary = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    content: new FormControl(''),
    tagId: new FormControl(''),
    file: new FormControl(''),
  });
  private returnUrl: string;
  private filePath: any;
  private processValue = 0;

  constructor(private token: TokenStorageService,
              private diaryService: DiaryService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }, error0 => {
        alert('error get manage-tag');
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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/diary/listUserDiary';
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = ( event ) => {
      this.filePath = reader.result;
    };
  }


  createDiary(openModalRef: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    const {title, description, content, tagId} = this.formDiary.value;

    if (title === '' || description === '' || content === '' || tagId === '' || this.fileUpload == null || this.fileUpload === undefined) {
      return alert('Fill Data Fields !');
    }

    this.processRun();
    openProcessBar.click();

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
          this.diaryService.uploadFile(form, result.id).subscribe(
            next => {
              console.log('upload file ok');
              closeProcess.click();
              openModalRef.click();
              this.previewId = result.id;
              this.formDiary.reset();
              this.filePath = undefined;
            }, error1 => {
              console.log('loi upload file');
            }
          );
      }, error5 => {
        return console.log('fail create diary');
      }
    );
  }

  preview(closeButton: HTMLInputElement) {
    closeButton.click();
    return this.router.navigateByUrl('/diary/' + this.previewId);
  }

  processRun() {
    const count = setInterval(() => {
      this.processValue += 40;
    }, 1000 );

    setTimeout(() => { clearInterval(count) ; this.processValue += 19; }, 2000);
  }
}
