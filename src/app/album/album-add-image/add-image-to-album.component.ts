import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../model/album';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../model/tag';
import {TagService} from '../../services/tag.service';
import {Image} from '../../model/image';

@Component({
  selector: 'app-add-image-to-album',
  templateUrl: './add-image-to-album.component.html',
  styleUrls: ['./add-image-to-album.component.scss']
})
export class AddImageToAlbumComponent implements OnInit {
  urls = [];
  private fileList = [];
  private albumId: string;
  private album: Album;
  private filePath: any;
  tagId = '';
  fileUpload: File;
  tagList: Tag[] = [];
  imageList: Image[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private albumService: AlbumService,
              private tagService: TagService) {
    this.activatedRoute.params.subscribe(params => {
      this.albumId = params.id;
    });
  }

  ngOnInit() {
    console.log(this.albumId);
    this.getAlbumById();
    this.getListAllTag();
    this.getAllImageOfAlbum();
  }

  getAllImageOfAlbum() {
    this.albumService.getListImageByAlbumId(this.albumId).subscribe(
      result => {
        this.imageList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getAlbumById() {
    this.albumService.getAlbumById(this.albumId).subscribe(
      result => {
        this.album = result;
      }
    );
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

  updateAlbum() {
    if (this.album.description === '') {
      alert('Fill Data Fields !');
    }
    if ( this.tagId === '') {
      this.tagId = this.album.tag.id;
    }
    console.log(this.tagId, this.album.description , this.fileUpload);
    const formAlbum: Album = {
      id: this.album.id,
      tag: {
        id: this.tagId
      },
      description: this.album.description
    };

    this.albumService.updateAlbum(formAlbum).subscribe(
      result => {
        if (this.fileUpload === null || this.fileUpload === undefined ) {
          console.log('update album no update avatar ok');
        } else {
          const form = new FormData();
          form.append('file', this.fileUpload);
          this.albumService.uploadAlbumAvatar(form, result.id).subscribe(
            next => {
              console.log('upload file ok');
            }, error1 => {
              console.log('loi upload file');
            }
          );
        }
      }, error => {
        console.log(error);
      }
    );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.fileList.push(event.target.files.item(i));
        const reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(this.fileList);
          console.log(this.urls);
          this.urls.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(i: number) {
    this.urls.splice(i, 1);
    this.fileList.splice(i, 1);
    console.log(this.fileList);
    console.log(this.urls);
  }

  uploadImageOfAlbum() {
   this.updateAlbum();
   const form = new FormData();
   for (const file of this.fileList) {
    form.append('files', file);
    }

   this.albumService.uploadAlbumImage(form , this.album.id).subscribe(
      result => {
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

}
