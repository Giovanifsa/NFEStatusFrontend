import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export default abstract class AbstractResource {
    private API_ADDRESS = "http://localhost:8080";

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
        let url = this.API_ADDRESS;

        if (!endpoint.startsWith("/")) {
            url += "/";
        }

        return url + endpoint;
    }
}