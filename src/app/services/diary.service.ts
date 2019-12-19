import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Diary} from '../model/diary';
import {Observable} from 'rxjs';
import {FileForm} from '../model/file-form';
import {SearchDiaryByTitleAndUserId} from '../model/search-diary-by-title-and-user-id';
import {Tag} from '../model/tag';
import {Pagination} from '../model/pagination';

import {SearchDiaryByTitle} from '../model/search-diary-by-title';
import {SearchDiaryByTagAndTitle} from '../model/search-diary-by-tag-and-title';
import {environment} from '../../environments/environment';
// import {environment} from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) {
  }

  // local
  private svDiaryUrl = environment.diaryUrl;
  private svUploadFile = environment.diaryUploadFileUrl;



  // server
  // private svDiaryUrl = environment.SvDiaryUrl;
  // private svUploadFile = environment.SvDiaryUploadFileUrl;

  getListDiaryAndPaginationASC(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.svDiaryUrl + 'pagination/ASC?page=' + page);
  }

  getListDiaryAndPaginationDESC(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.svDiaryUrl + 'pagination/DESC?page=' + page);
  }

  getListDiary(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.svDiaryUrl);
  }

  createDiary(diary: Diary): Observable<Diary> {
    return this.http.post<Diary>(this.svDiaryUrl, diary);
  }

  uploadFile(file: FormData, diaryId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.svUploadFile + diaryId, file, {headers});
  }

  findDiaryById(id: string): Observable<Diary> {
    return this.http.get<Diary>(this.svDiaryUrl + id);
  }

  deleteDiaryById(id: string): Observable<void> {
    return this.http.delete<void>(this.svDiaryUrl + id);
  }

  updateDiary(diary: Diary): Observable<Diary> {
    return this.http.put<Diary>(this.svDiaryUrl + diary.id, diary);
  }

  searchDiaryByTitleAndUserID(title: SearchDiaryByTitleAndUserId): Observable<Diary[]> {
    return this.http.post<Diary[]>(this.svDiaryUrl + 'searchBy-Title-And-UserId', title);
  }

  searchDiaryByTitle(title: SearchDiaryByTitle): Observable<Diary[]> {
    return this.http.post<Diary[]>(this.svDiaryUrl + 'search-by-title', title);
  }

  searchDiaryByTagAndTitle(searchForm: SearchDiaryByTagAndTitle): Observable<Diary[]> {
    return this.http.post<Diary[]>(this.svDiaryUrl + 'search-by-tag-and-title' , searchForm);
  }

  searchDiaryByTagId(id: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.svDiaryUrl + 'searchBy-TagId/' + id );
  }

}
