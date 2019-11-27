import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Diary} from './diary';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
// import {environment} from '../../environments/environment.prod';
import {User} from './user';
import {UserForm} from '../profile-user/user-form';
import {SearchUserByName} from './search-user-by-name';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // local
  private userUrl = environment.userUrl;

  // server
  // private svUserUrl = environment.SvUserUrl;


  constructor(private http: HttpClient) { }

  getDiaryByUser(userId: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.userUrl + userId + '/diary' );
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(this.userUrl + id);
  }

  searchUserByName(user: SearchUserByName): Observable<User[]> {
    return this.http.post<User[]>(this.userUrl + 'search-by-name' , user);
  }
}
