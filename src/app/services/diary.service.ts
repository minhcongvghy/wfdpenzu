import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Diary} from './diary';
import {Observable} from 'rxjs';
import {FileForm} from './file-form';
import {SearchDiaryByTitleAndUserId} from './search-diary-by-title-and-user-id';
import {Tag} from './tag';
import {Pagination} from './pagination';
// import {environment} from '../../environments/environment.prod';
import {SearchDiaryByTitle} from './search-diary-by-title';
import {SearchDiaryByTagAndTitle} from './search-diary-by-tag-and-title';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) {
  }

  // // local
  private diaryUrl = environment.diaryUrl;
  private uploadFileUrl = environment.uploadFileUrl;

  // server
  // private svDiaryUrl = environment.SvDiaryUrl;
  // private svUploadFile = environment.SvUploadFileUrl;

  Pagination(page: number): Observable<Pagination> {
    return this.http.get<Pagination>(this.diaryUrl + 'pagination?page=' + page);
  }

  getListDiary(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.diaryUrl);
  }

  createDiary(diary: Diary): Observable<Diary> {
    return this.http.post<Diary>(this.diaryUrl, diary);
  }

  uploadFile(file: FormData, diaryId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.uploadFileUrl + diaryId, file, {headers});
  }

  findDiaryById(id: string): Observable<Diary> {
    return this.http.get<Diary>(this.diaryUrl + id);
  }

  deleteDiaryById(id: string): Observable<void> {
    return this.http.delete<void>(this.diaryUrl + id);
  }

  updateDiary(diary: Diary): Observable<Diary> {
    return this.http.put<Diary>(this.diaryUrl + diary.id, diary);
  }

  searchDiaryByTitleAndUserID(title: SearchDiaryByTitleAndUserId): Observable<Diary[]> {
    return this.http.post<Diary[]>(this.diaryUrl + 'searchBy-Title-And-UserId', title);
  }

  searchDiaryByTitle(title: SearchDiaryByTitle): Observable<Diary[]> {
    return this.http.post<Diary[]>(this.diaryUrl + 'search-by-title', title);
  }

  searchDiaryByTagAndTitle(searchForm: SearchDiaryByTagAndTitle): Observable<Diary[]> {
    return this.http.post<Diary[]>(this.diaryUrl + 'search-by-tag-and-title' , searchForm);
  }

  searchDiaryByTagId(id: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.diaryUrl + 'searchBy-TagId/' + id );
  }

}
