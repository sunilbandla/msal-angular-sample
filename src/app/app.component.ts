import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { GraphService } from 'app/services/graph.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public user: Msal.User = null;
    public userInfo: any = null;
    public apiCallFailed: boolean;
    public loginFailed: boolean;

    constructor(private authService: AuthService,
                private graphService: GraphService) {
    }
    
    public login() {
        this.loginFailed = false;
        this.authService.login()
            .then(user => {
                if (user) {
                    this.user = user;
                } else {
                    this.loginFailed = true;
                }
            }, () => {
                this.loginFailed = true;
            });
    }

    private callAPI() {
        this.apiCallFailed = false;
        this.authService.getToken()
            .then(token => {
                this.graphService.getUserInfo(token)
                    .subscribe(data => {
                        this.userInfo = data;
                    }, error => {
                        console.error(error);
                        this.apiCallFailed = true;
                    });
            }, error => {
                console.error(error);
                this.apiCallFailed = true;
            });
    }

    private logout() {
        this.authService.logout();
    }
}
