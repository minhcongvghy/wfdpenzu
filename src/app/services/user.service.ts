import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Diary} from './diary';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
// import {environment} from '../../environments/environment.prod';
import {User} from './user';
import {UserForm} from '../auth/profile/user-form';
import {SearchUserByName} from './search-user-by-name';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // local
  private svUserUrl = environment.userUrl;

  // server
  // private svUserUrl = environment.SvUserUrl;


  constructor(private http: HttpClient) { }

  getDiaryByUser(userId: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.svUserUrl + userId + '/diary' );
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
}
