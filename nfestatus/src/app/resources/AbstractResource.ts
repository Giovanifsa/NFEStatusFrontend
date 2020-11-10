import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export default abstract class AbstractResource {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    protected GET(endpoint: string) : Observable<any> {
        return this.httpClient.get(this.buildURL(endpoint));
    }

    protected POST(endpoint: string, data: any) : Observable<any> {
        return this.httpClient.post(this.buildURL(endpoint), data);
    }

    private buildURL(endpoint: string) : string {
        let url = environment.API_ADDRESS;

        if (!endpoint.startsWith("/")) {
            url += "/";
        }

        return url + endpoint;
    }
}