import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import AbstractResource from "./AbstractResource";
import EnumServiceDTO from "./dtos/EnumServiceDTO";

@Injectable({
  providedIn: 'root'
})
export default class EnumServiceResource extends AbstractResource {
    constructor(httpClient: HttpClient) { 
        super(httpClient);
    }

    public findAll(callback: (r: EnumServiceDTO[]) => void,
                   errHandler: (r: HttpErrorResponse) => void) : void {

        const FIND_ALL_ENDPOINT = "/service/listall";

        this.GET(FIND_ALL_ENDPOINT)
            .subscribe((data: EnumServiceDTO[]) => {
                callback(data);
            },
            errHandler
        );
    }
}
