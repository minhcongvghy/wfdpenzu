import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tag} from './tag';
import {Observable} from 'rxjs';
// import {environment} from '../../environments/environment.prod';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TagService {
  // local
  private tagUrl = environment.tagUrl;

  // server
  // private svTagUrl = environment.SvTagUrl;

  constructor(private http: HttpClient) { }

  getTagList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagUrl);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.tagUrl , tag);
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(this.tagUrl + tag.id , tag);
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(this.tagUrl + id);
  }

  searchTagByName(tag: Tag): Observable<Tag[]> {
    return this.http.post<Tag[]>(this.tagUrl + 'search-by-name', tag);
  }

}
