import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../model/album';

@Component({
  selector: 'app-manage-album',
  templateUrl: './manage-album.component.html',
  styleUrls: ['./manage-album.component.scss']
})
export class ManageAlbumComponent implements OnInit {

  private albumList: Album[] = [];
  private albumId: string;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.getAllAlbum();
  }

  getAllAlbum() {
    this.albumService.getListALlAlbum().subscribe(
      result => {
        this.albumList = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

  getAlbumId(id: string) {
    this.albumId = id;
  }

  deleteAlbum(closeModalRef2: HTMLButtonElement) {
    this.albumService.deleteAlbumById(this.albumId).subscribe(
      result => {
        this.getAllAlbum();
        closeModalRef2.click();
      }, error =>  {
        console.log(error);
      }
    );
  }
}
