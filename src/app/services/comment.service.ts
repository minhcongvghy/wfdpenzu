
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
   URL = 'http://localhost:8080/api/auth/comment/';
  constructor(private http: HttpClient) { }

  getAllCommentByDiary(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.URL + 'diary/' + id);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.URL , comment);
  }

  editComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.URL + comment.id , comment);
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(this.URL +  id);
  }
}
