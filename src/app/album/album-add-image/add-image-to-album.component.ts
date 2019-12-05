import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../model/album';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../model/tag';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'app-add-image-to-album',
  templateUrl: './add-image-to-album.component.html',
  styleUrls: ['./add-image-to-album.component.scss']
})
export class AddImageToAlbumComponent implements OnInit {
  urls = [];
  private fileList: any [] = [];
  private albumId: string;
  private album: Album;
  private filePath: any;
  fileUpload: File;
  albumForm = new FormGroup({
    tagId: new FormControl(''),
    description: new FormControl('')
  });
  tagList: Tag[] = [];

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

}
