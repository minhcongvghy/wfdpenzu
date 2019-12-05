import { Component, OnInit } from '@angular/core';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../model/album';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-album-list-of-user',
  templateUrl: './album-list-of-user.component.html',
  styleUrls: ['./album-list-of-user.component.scss']
})
export class AlbumListOfUserComponent implements OnInit {

  albumId: string;
  albumList: Album[] = [];
  constructor(private albumService: AlbumService,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.getListAbumByUserId();
  }

  getListAbumByUserId() {
    this.albumService.getAlbumsByUserId(this.token.getUserId()).subscribe(
      result => {
        this.albumList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getAlbumId(id: string) {
    this.albumId = id;
  }

  deleteDiaryById(closeModalRef: HTMLButtonElement) {
    this.albumService.deleteAlbumById(this.albumId).subscribe(
      result => {
        this.getListAbumByUserId();
        closeModalRef.click();
      }
    );
  }
}
