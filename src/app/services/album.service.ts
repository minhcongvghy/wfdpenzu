import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../model/album';
import {FileForm} from '../model/file-form';
import {MultiFileForm} from '../model/multi-file-form';
import {Image} from '../model/image';
import {FindAlbumsByTitle} from '../model/find-albums-by-title';
import {Pagination} from '../model/pagination';
import {SearchAlbumByTagIdAndTitle} from '../model/search-album-by-tag-id-and-title';
// import {environment} from '../../environments/environment.prod';
import {environment} from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  // local
  albumURL = environment.albumUrl;
  uploadAvatar = environment.albumUploadAvatarUrl;
  uploadImage = environment.albumUploadImageUrl;
  imageURL = environment.imageUrl;

  // server
  // albumURL = environment.SvAlbumUrl;
  // uploadAvatar = environment.SvAlbumUploadAvatarUrl;
  // uploadImage = environment.SvAlbumUploadImageUrl;
  // imageURL = environment.SvImageUrl;

  constructor(private http: HttpClient) {
  }

  getListALlAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumURL);
  }

  getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(this.albumURL + id);
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.albumURL , album);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(this.albumURL + album.id , album);
  }

  deleteAlbumById(id: string): Observable<void> {
    return this.http.delete<void>(this.albumURL + id);
  }

  uploadAlbumAvatar(file: FormData, diaryId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.uploadAvatar + diaryId, file, {headers});
  }

  uploadAlbumImage(file: FormData, albumId: string): Observable<MultiFileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<MultiFileForm>(this.uploadImage + albumId , file , {headers});
  }

  getListImageByAlbumId(id: string): Observable<Image[]> {
    return this.http.get<Image[]>(this.imageURL + 'search-image-by-albumId/' + id);
  }

  deleteImageById(id: string): Observable<void> {
  return this.http.delete<void>(this.imageURL + id);
  }

  getAlbumsByUserId(userId: string): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumURL + 'search-by-userId/' + userId);
  }

  findAlbumsByTitle(title: FindAlbumsByTitle): Observable<Album[]> {
    return this.http.post<Album[]>(this.albumURL + 'search-album-by-title', title);
  }

  getListAlbumAndSortingByDateASC(): Observable<Pagination> {
    return this.http.get<Pagination>(this.albumURL + 'pagination/ASC');
  }

  getListAlbumAndSortingByDateDESC(): Observable<Pagination> {
    return this.http.get<Pagination>(this.albumURL + 'pagination/DESC');
  }

  searchAlbumByTagIdAndTitle(searchForm: SearchAlbumByTagIdAndTitle): Observable<Album[]> {
    return this.http.post<Album[]>(this.albumURL + 'search-by-tagId-and-title' , searchForm);
  }
}

