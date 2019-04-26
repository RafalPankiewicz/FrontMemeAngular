import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, MemeService } from '../_services';
import { User } from '../_models';



@Component({templateUrl: 'add_meme.component.html'})
export class Add_memeComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser:User;
    public progress: number;
  public message: string;
  	
public response: {dbPath: ''};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private memeService: MemeService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.registerForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(6)]],
            photoName: ['', Validators.required],
            userId: [this.currentUser.id]
        });
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    public uploadFinished = (event) => {
        this.response = event;
      }
  

  

    onSubmit() {
        this.submitted = true;

        this.registerForm.controls['photoName'].setValue(this.response.dbPath);

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

       
        
    
        this.loading = true;
        this.memeService.addMeme(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Add Meme successful', true);
                    this.router.navigate(['/memes']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
