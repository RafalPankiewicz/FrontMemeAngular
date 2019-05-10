import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, MemeService,CommentService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { MemeComponent } from './meme';
import { Add_memeComponent } from './add_meme';
import { UploadComponent } from './upload';
import { MemeDetailsComponent } from './meme_details';
import { CommentComponent } from './comment';
import { Edit_memeComponent } from './edit_meme';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        MemeComponent,
        Add_memeComponent,
        UploadComponent,
        MemeDetailsComponent,
        CommentComponent,
        Edit_memeComponent

    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        MemeService,
        CommentService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
      //  fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }