import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Diary} from './diary';
import {Observable} from 'rxjs';
import {FileForm} from './file-form';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private diaryUrl = 'http://localhost:8080/api/auth/diary';
  private uploadFileUrl = 'http://localhost:8080/api/auth/file/';

  constructor(private http: HttpClient) { }

  createDiary(diary: Diary): Observable<Diary> {
    return this.http.post<Diary>(this.diaryUrl , diary);
  }

  uploadFile(file: FormData, diaryId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.uploadFileUrl + diaryId, file, {headers});
  }

}
