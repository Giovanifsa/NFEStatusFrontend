import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import AbstractResource from "./AbstractResource";
import NFEStatusSnapshotFilterDTO from "./dtos/NFEStatusSnapshotFilterDTO";
import NFEStatusSnapshotFilterResultDTO from "./dtos/NFEStatusSnapshotFilterResultDTO";
import NFEStatusSnapshotFilterMostUnavailableDTO from "./dtos/NFEStatusSnapshotFilterMostUnavailableDTO";
import NFEStatusSnapshotFilterMostUnavailableResultDTO from "./dtos/NFEStatusSnapshotFilterMostUnavailableResultDTO";

@Injectable({
    providedIn: 'root'
})
export default class NFEStatusSnapshotResource extends AbstractResource {
    private baseURL = "/nfestatussnapshot";

    constructor(httpClient: HttpClient) { 
        super(httpClient);
    }

    public queryByAuthorizersAndDatePaginated(filter: NFEStatusSnapshotFilterDTO, callback: (r: NFEStatusSnapshotFilterResultDTO) => void) : void {
        let endpoint = this.baseURL + "/querybyauthorizersanddatepaginated";

        this.POST(endpoint, filter).subscribe((data: NFEStatusSnapshotFilterResultDTO) => {
            callback(data);
        })
    }

    public queryByMostUnavailableServicesPaginated(filter: NFEStatusSnapshotFilterMostUnavailableDTO, 
                                                   callback: (r: NFEStatusSnapshotFilterMostUnavailableResultDTO) => void) : void {

        let endpoint = this.baseURL + "/querybymostunavailableservicespaginated";

        this.POST(endpoint, filter).subscribe((data: NFEStatusSnapshotFilterMostUnavailableResultDTO) => {
            callback(data);
        })
    }
}