import {Component, OnInit} from '@angular/core';
import {Album} from '../../model/album';
import {AlbumService} from '../../services/album.service';
import {TagService} from '../../services/tag.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../model/tag';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-diary-image-create',
  templateUrl: './diary-image-create.component.html',
  styleUrls: ['./diary-image-create.component.scss']
})
export class DiaryImageCreateComponent implements OnInit {
  private filePath: any;
  fileUpload: File;
  albumForm = new FormGroup({
    title: new FormControl(''),
    tagId: new FormControl(''),
    description: new FormControl('')
  });
  tagList: Tag[] = [];
  private redirectID: string;
  private processValue = 0;

  constructor(private albumService: AlbumService,
              private route: ActivatedRoute,
              private router: Router,
              private tagService: TagService,
              private token: TokenStorageService) {
  }

  ngOnInit() {
    this.getListAllTag();
  }

  getListAllTag() {
    this.tagService.getTagList().subscribe(
      result => {
        this.tagList = result;
      }
    );
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }

  createAlbum(openModalRef: HTMLButtonElement, openProcessBar: HTMLButtonElement, closeProcess: HTMLButtonElement) {
    const {title, tagId , description} = this.albumForm.value;
    if (description === '' || this.fileUpload == null || tagId === '') {
      return alert('Fill Data Fields !');
    }
    openProcessBar.click();
    this.processRun();
    const album: Album = {
      title,
      description,
      tag: {
        id: tagId
      },
      user: {
        id: this.token.getUserId()
      }
    };

    this.albumService.createAlbum(album).subscribe(
      result => {
        const form = new FormData();
        form.append('file', this.fileUpload);
        this.albumService.uploadAlbumAvatar(form, result.id).subscribe(
          next => {
            console.log('upload file ok');
            closeProcess.click();
            openModalRef.click();
            this.redirectID = result.id;
            this.albumForm.reset();
            this.filePath = undefined;
          }, error1 => {
            console.log('loi upload file');
          }
        );
      }
    );
  }

  preview( closeModalRef1: HTMLButtonElement) {
    closeModalRef1.click();
    return this.router.navigateByUrl('/library/album-picture-add-image/' + this.redirectID);
  }

  processRun() {
    const count = setInterval(() => {
      this.processValue += 40;
    }, 1000 );

    setTimeout(() => { clearInterval(count) ; this.processValue += 19; }, 2000);
  }
}
