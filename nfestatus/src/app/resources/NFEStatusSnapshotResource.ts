import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import AbstractResource from "./AbstractResource";
import NFEStatusSnapshotFilterDTO from "./dtos/NFEStatusSnapshotFilterDTO";
import NFEStatusSnapshotFilterResultDTO from "./dtos/NFEStatusSnapshotFilterResultDTO";

@Injectable({
    providedIn: 'root'
})
export default class NFEStatusSnapshotResource extends AbstractResource {
    constructor(httpClient: HttpClient) { 
        super(httpClient);
    }

    public findPaginated(filter: NFEStatusSnapshotFilterDTO, callback: (r: NFEStatusSnapshotFilterResultDTO) => void) : void {
        const FIND_PAGINATED_ENDPOINT = "/nfestatussnapshot/paginated";

        this.POST(FIND_PAGINATED_ENDPOINT, filter).subscribe((data: NFEStatusSnapshotFilterResultDTO) => {
            callback(data);
        })
    }
}