import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meme } from '../_models/meme';

@Injectable()
export class MemeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Meme[]>(`${config.apiUrl}/api/memes`);
    }

    getById(id: number) {
        return this.http.get<Meme>(`${config.apiUrl}/api/memes/` + id);
    }
    upRate(id: number) {
        return this.http.get(`${config.apiUrl}/api/memes/UpRate/` + id);
    }
    downRate(id: number) {
        return this.http.get(`${config.apiUrl}/api/memes/DownRate/` + id);
    }

    addMeme(meme: Meme) {
        return this.http.post(`${config.apiUrl}/api/memes/`, meme);
    }
  

    update(meme: Meme) {
        return this.http.put(`${config.apiUrl}/api/memes/` + meme.id, meme);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/api/memes/` + id);
    }
}