import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { MemeComponent } from './meme';
import { AuthGuard } from './_guards';
import { Add_memeComponent } from './add_meme';
import { MemeDetailsComponent } from './meme_details';

const appRoutes: Routes = [
    { path: '', component: MemeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'memes', component: MemeComponent },
    { path: 'add-meme', component: Add_memeComponent,canActivate: [AuthGuard]  },
    { path: 'memeDetail/:id', component: MemeDetailsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);