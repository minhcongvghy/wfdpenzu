import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Diary} from '../model/diary';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
// import {environment} from '../../environments/environment.prod';
import {User} from '../model/user';

import {UserForm} from '../auth/profile/user-form';
import {SearchUserByName} from '../model/search-user-by-name';
import {FileForm} from '../model/file-form';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // local
  private svUserUrl = environment.userUrl;
  private svUserAvatarUrl = environment.UserAvatarUrl;

  // server
  // private svUserUrl = environment.SvUserUrl;
  // private svUserAvatarUrl = environment.SvUserAvatarUrl;


  constructor(private http: HttpClient) { }

  getDiaryByUser(userId: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.svUserUrl + userId + '/diary' );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.svUserUrl + userId);
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.svUserUrl);
  }

  deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(this.svUserUrl + id);
  }

  searchUserByName(user: SearchUserByName): Observable<User[]> {
    return this.http.post<User[]>(this.svUserUrl + 'search-by-name' , user);
  }

  uploadUserAvatar(file: FormData, userId: string): Observable<FileForm> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<FileForm>(this.svUserAvatarUrl + userId, file, {headers});
  }
}
