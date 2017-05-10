import { Injectable } from '@angular/core';
import '../../../node_modules/msal/out/msal';
/// <reference path="../../../node_modules/msal/out/msal.d.ts" />

@Injectable()
export class AuthService {
    private applicationConfig: any = {
        clientID: '60e769a3-2b51-4adf-a7e9-b3377270e648',
        graphScopes: ['user.read']
    };
    private app: any;

    constructor() {
        this.app = new Msal.UserAgentApplication(this.applicationConfig.clientID, '', () => {
            // callback for login redirect
        });
    }
    public login() {
        return this.app.loginPopup(this.applicationConfig.graphScopes)
            .then(idToken => {
                const user = this.app.getUser();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }, () => {
                return null;
            });
    }
    public logout() {
        this.app.logout();
    }
    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes)
            .then(accessToken => {
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                    });
            });
    }
}