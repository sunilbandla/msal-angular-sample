import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {
    private readonly graphUrl = 'https://graph.microsoft.com/';
    constructor(private http: Http) {

    }

    public getUserInfo(token: string, version: string) {
        const headers = new Headers({ 'Authorization': `Bearer ${token}` });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(`${this.graphUrl}/${version}/me`, options)
            .map(response => response.json())
            .catch(response => Observable.throw(response.text()));
    }
} 