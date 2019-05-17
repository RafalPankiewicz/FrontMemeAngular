﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_services';
import { Meme} from '../_models';

import { AlertService, MemeService } from '../_services';

@Component({templateUrl: 'meme.component.html',
            styleUrls: ['meme.component.css']})
export class MemeComponent implements OnInit {
    memes: Meme[] = [];
    currentUser:User;
    deleteModal = false;
    removeMeme: Meme;
    constructor(
        private memeService: MemeService,
        private alertService: AlertService
        ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loadAllMemes();

    }

    deleteMeme() {
        
        this.memeService.delete(this.removeMeme.id).pipe(first()).subscribe(
        data => {
            this.alertService.success('Delete meme successful', true);
            this.loadAllMemes() 
            this.deleteModal = false;
        },
        error => {
            this.alertService.error(error);
            this.deleteModal = false;
        }
        );
    }
 
    deleteMemeModal(id: number) {
        this.deleteModal = true;
        this.removeMeme =this.memes.find(m => m.id == id);
        
    }
    UpRate(id: number) {
        this.memeService.upRate(id).pipe(first()).subscribe(() => { 
            this.memes.find(m => m.id == id).rate++;
        });
    }
    DownRate(id: number) {
        this.memeService.downRate(id).pipe(first()).subscribe(() => { 
            this.memes.find(m => m.id == id).rate--;
        });
    }

    public createImgPath = (serverPath: string) => {
        return `${config.apiUrl}/api/files?filename=${serverPath}`;
      }

    private loadAllMemes() {
        this.memeService.getAll().pipe(first()).subscribe(memes => { 
            this.memes = memes; 
        });
    }
}