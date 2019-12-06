import { Component, OnInit } from '@angular/core';
import {Album} from '../../model/album';
import {AlbumService} from '../../services/album.service';

@Component({
  selector: 'app-album-main',
  templateUrl: './album-main.component.html',
  styleUrls: ['./album-main.component.scss']
})
export class AlbumMainComponent implements OnInit {
  albumList: Album[] = [];
  constructor(private albumService: AlbumService,) { }

  ngOnInit() {
    this.getAllAlbum();
  }
  getAllAlbum() {
    this.albumService.getListALlAlbum().subscribe(
      result => {
        this.albumList = result;
      }, error => {
        console.log(error);
      }
    );
  }
}
