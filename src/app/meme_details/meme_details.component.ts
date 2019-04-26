import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Meme} from '../_models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MemeService } from '../_services';

@Component(
    {templateUrl: 'meme_details.component.html',
    styleUrls: ['meme_details.component.css'] })
export class MemeComponent implements OnInit {
    @Input() meme: Meme;

    constructor(
        private memeService: MemeService,
        private route: ActivatedRoute,
        private location: Location) {
        
    }

    ngOnInit() {
        this.getMeme();
    }

    getMeme(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.memeService.getById(id).pipe(first()).subscribe(meme => this.meme = meme);
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