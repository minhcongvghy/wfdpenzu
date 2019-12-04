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
  private svTagUrl = environment.tagUrl;

  // server
  // private svTagUrl = environment.SvTagUrl;

  constructor(private http: HttpClient) { }

  getTagList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.svTagUrl);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.svTagUrl , tag);
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(this.svTagUrl + tag.id , tag);
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(this.svTagUrl + id);
  }

  searchTagByName(tag: Tag): Observable<Tag[]> {
    return this.http.post<Tag[]>(this.svTagUrl + 'search-by-name', tag);
  }

}
