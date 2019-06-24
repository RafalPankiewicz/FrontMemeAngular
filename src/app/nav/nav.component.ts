import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { User } from '../_models';

@Component(
    { selector: 'app-nav',templateUrl: 'nav.component.html'}
)
export class NavComponent implements OnInit {
    
 
    returnUrl: string;
    currentUser: User;

    constructor(
      
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
            this.authenticationService.getEmitter().subscribe((user) => {
               this.currentUser = user;
              });     
    }

    ngOnInit() {
        if(!this.currentUser)
        {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    logout(){
        this.authenticationService.logout();
        this.router.navigate([""]);
    }

    login(){  
        this.router.navigateByUrl('/login');
    }

   

}
