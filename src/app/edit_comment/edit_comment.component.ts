import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService, CommentService } from '../_services';
import { User, Comment } from '../_models';
import { t } from '@angular/core/src/render3';



@Component({templateUrl: 'edit_comment.component.html'})
export class Edit_CommentComponent implements OnInit {
    @Input() comment: Comment;
    commentForm: FormGroup;
    currentUser:User;
    loading = false;
    submitted = false;
    comments: Comment[] = [];

    constructor( private formBuilder: FormBuilder,
                    private router: Router,
                    private commentService: CommentService,
                    private alertService: AlertService,
                    private route: ActivatedRoute,
                    private location: Location) {}
   

    // convenience getter for easy access to form fields
    get f() { return this.commentForm.controls; }

onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }

        this.loading = true;
        

        this.commentService.update(this.commentForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Comment edit successful', true);
                    this.loading = false;
                    this.router.navigate([`/memeDetail/`+this.comment.memeID]);

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                   
                });
                
    }


    ngOnInit() {
        this.getComment();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
   }

   getComment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.getById(id).pipe(first()).subscribe(commentt => {this.comment = commentt;
        this.commentForm = this.formBuilder.group({
            id:[this.comment.id],
            contetnt: [this.comment.contetnt, [Validators.required, Validators.minLength(6)]],
            userCommID: [this.comment.userCommID],
            memeID:[this.comment.memeID]
        });        
    });
  }



 

  
}
