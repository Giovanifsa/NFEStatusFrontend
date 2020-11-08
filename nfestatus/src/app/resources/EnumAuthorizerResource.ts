import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import AbstractResource from "./AbstractResource";
import EnumAuthorizerDTO from "./dtos/EnumAuthorizerDTO";

@Injectable({
  providedIn: 'root'
})
export default class EnumAuthorizerResource extends AbstractResource {
    constructor(httpClient: HttpClient) { 
        super(httpClient);
    }

    public findAll(callback: (r: EnumAuthorizerDTO[]) => void) : void {
        const FIND_ALL_ENDPOINT = "/authorizer/listall";

        this.GET(FIND_ALL_ENDPOINT).subscribe((data: EnumAuthorizerDTO[]) => {
            callback(data);
        });
    }
}
