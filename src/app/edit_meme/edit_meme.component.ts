import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService, MemeService } from '../_services';
import { User,Meme } from '../_models';



@Component({templateUrl: 'edit_meme.component.html'})
export class Edit_memeComponent implements OnInit {
    @Input() meme: Meme;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser:User;
    public progress: number;
    public message: string;
  	public response: {dbPath: string};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private memeService: MemeService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.getMeme();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       // this.alertService.success(this.meme.title, true);
        
   
        
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    public uploadFinished = (event) => {
        this.response = event;
      }
  

      getMeme(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.memeService.getById(id).pipe(first()).subscribe(meme => {this.meme = meme;
            this.registerForm = this.formBuilder.group({
                id:[this.meme.id],
                title: [this.meme.title,[Validators.required, Validators.minLength(6)]],
                photoName: [this.meme.photoName, Validators.required],
                userId: [this.currentUser.id]
            }); 
            this.response.dbPath = this.meme.photoName ;
        });
      }
  

    onSubmit() {
        this.submitted = true;
        if(this.response.dbPath)
        {
            this.registerForm.controls['photoName'].setValue(this.response.dbPath);



        }
        

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } 
    
        this.loading = true;
        this.memeService.update(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Edit Meme successful', true);
                    this.router.navigate(['/memes']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    public createImgPath = (serverPath: string) => {
        return `${config.apiUrl}/api/files?filename=${serverPath}`;
      }
}
