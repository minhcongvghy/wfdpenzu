import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-image-to-album',
  templateUrl: './add-image-to-album.component.html',
  styleUrls: ['./add-image-to-album.component.scss']
})
export class AddImageToAlbumComponent implements OnInit {

  private fileList: any [] = [];

  constructor() { }

  urls = [];

  ngOnInit(): void {
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.fileList.push(event.target.files.item(i));
        let reader = new FileReader();

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
