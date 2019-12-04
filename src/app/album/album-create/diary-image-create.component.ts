import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-diary-image-create',
  templateUrl: './diary-image-create.component.html',
  styleUrls: ['./diary-image-create.component.scss']
})
export class DiaryImageCreateComponent implements OnInit {
  private filePath: any;
  fileUpload: File;

  constructor() {
  }

  ngOnInit() {
  }

  handleFileChooser(files: FileList) {
    this.fileUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.filePath = reader.result;
    };
  }
}
