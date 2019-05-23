import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Meme, User} from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MemeService, UserService, AlertService } from '../_services';

@Component(
    {templateUrl: 'meme_details.component.html',
    styleUrls: ['meme_details.component.css'] })
export class MemeDetailsComponent implements OnInit {
    @Input() meme: Meme;
    currentUser:User;
    bannUser:User;
    deleteModal = false;

    constructor(
        private memeService: MemeService,
        private userService: UserService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) {
        
    }

    ngOnInit() {
        this.getMeme();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
    }

    getMeme(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.memeService.getById(id).pipe(first()).subscribe(meme => this.meme = meme);
      }
    deleteMemeModal(id: number) {
        this.deleteModal = true;
    }

    bannUserModal(id: number) {
        this.userService.getById(id).pipe(first()).subscribe(user => this.bannUser = user);
    }

    deleteMeme() {
        
        this.memeService.delete(this.meme.id).pipe(first()).subscribe(
        data => {
            this.alertService.success('Delete meme successful', true);
            this.router.navigate([""]);
            this.deleteModal = false;
        },
        error => {
            this.alertService.error(error);
            this.deleteModal = false;
        }
        );
    }
 
    public createImgPath = (serverPath: string) => {
        return `${config.apiUrl}/api/files?filename=${serverPath}`;
      }

      bannUserP(): void {
      
        this.userService.banUserById(this.bannUser.id).pipe(first()).subscribe(
            data => {
                this.alertService.success('Ban user success', true);
            },
            error => {
                this.alertService.error(error);
            });
      }
    
  
}