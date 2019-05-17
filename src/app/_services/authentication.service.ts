import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertService } from '.';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,
        private alertService: AlertService) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    if(!user.isBanned)
                    {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }else
                    {
                        this.alertService.error("Are you banned");
                        localStorage.removeItem('currentUser');
                        return null;
                    }

                    
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    
}