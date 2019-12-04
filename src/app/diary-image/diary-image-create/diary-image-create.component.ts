import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary-image-create',
  templateUrl: './diary-image-create.component.html',
  styleUrls: ['./diary-image-create.component.scss']
})
export class DiaryImageCreateComponent implements OnInit {
  private fileList: any [] = [];

  constructor() { }

  name = 'Angular 4';
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
