import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../_models/comment';

@Injectable()
export class CommentService {
    constructor(private http: HttpClient) { }

    getAllByMemeId(id: number) {
        return this.http.get<Comment[]>(`${config.apiUrl}/api/comments/GetCommentsByMemeID/`+id);
    }

    getById(id: number) {
        return this.http.get<Comment>(`${config.apiUrl}/api/comments/` + id);
    }

    addComment(meme: Comment) {
        return this.http.post(`${config.apiUrl}/api/comments/`, meme);
    }
  

    update(meme: Comment) {
        return this.http.put(`${config.apiUrl}/api/comments/` + meme.id, meme);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/api/comments/` + id);
    }
}