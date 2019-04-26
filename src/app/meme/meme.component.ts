import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService } from '../_services';
import { Meme} from '../_models';

import { MemeService } from '../_services/';

@Component({templateUrl: 'meme.component.html',
            styleUrls: ['meme.component.css']})
export class MemeComponent implements OnInit {
    memes: Meme[] = [];

    constructor(private memeService: MemeService) {
        
    }

    ngOnInit() {
        this.loadAllMemes();
    }

    deleteMeme(id: number) {
        this.memeService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllMemes() 
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