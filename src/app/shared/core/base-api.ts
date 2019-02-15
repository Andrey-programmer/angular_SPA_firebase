import { Observable } from 'rxjs-compat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()

export class BaseApi {
    
    // private baseUrl = 'http://localhost:3000/';
   

    constructor(public httpClient: HttpClient) {}

    private getUrl(url: string = ''): string {
        return this.baseUrl + url + '.json';
    }

    public get(url: string = ''): Observable<any> {
        return this.httpClient.get(this.getUrl(url), {
            responseType: 'json'
        });
    }

    public post(url: string = '', data: any = {}): Observable<any> {
        return this.httpClient.post(this.getUrl(url), data, {
            responseType: 'json'
        });
    }

    public put(url: string = '', data: any = {}): Observable<any> {
        return this.httpClient.put(this.getUrl(url), data, {
            responseType: 'json'
        });
    }

    // (https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyABVGaiU0p-ltWe0yHacLbn6ONQIDqtXGc)
    private baseUrl = 'https://angular-spa-project.firebaseio.com/'
}
