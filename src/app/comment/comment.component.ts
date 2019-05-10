import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService, AlertService } from '../_services';
import { Comment} from '../_models';

import { CommentService } from '../_services/';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({selector: 'app-comment',
            templateUrl: 'comment.component.html',
            styleUrls: ['comment.component.css']})
export class CommentComponent implements OnInit {
    @Input() memeId: number;
    commentForm: FormGroup;
    currentUser:User;
    loading = false;
    submitted = false;
    comments: Comment[] = [];

    constructor( private formBuilder: FormBuilder,
                    private router: Router,
                    private commentService: CommentService,
                    private alertService: AlertService) {}
   

    // convenience getter for easy access to form fields
    get f() { return this.commentForm.controls; }

onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }

        this.loading = true;
        

        this.commentService.addComment(this.commentForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Comment add successful', true);
                    this.loading = false;
                    this.loadAllComments();
                    this.commentForm.controls['contetnt'].setValue('');
                    this.commentForm.controls['contetnt'].setErrors(null);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.loadAllComments();
                });
                
    }


    ngOnInit() {
        this.loadAllComments();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.commentForm = this.formBuilder.group({
            contetnt: ['', [Validators.required, Validators.minLength(6)]],
            userCommId: [this.currentUser.id],
            memeId:[this.memeId]
        });
    }

    deleteMeme(id: number) {
        this.commentService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllComments() 
        });
    }



    private loadAllComments() {
        this.commentService.getAllByMemeId(this.memeId).pipe(first()).subscribe(comments => { 
            this.comments = comments; 
        });
    }
}