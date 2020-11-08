import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import EnumAuthorizerResource from "./resources/EnumAuthorizerResource";
import NFEStatusSnapshotResource from "./resources/NFEStatusSnapshotResource";
import EnumAuthorizerDTO from "./resources/dtos/EnumAuthorizerDTO";
import NFEStatusSnapshotDTO from "./resources/dtos/NFEStatusSnapshotDTO";
import NFEStatusSnapshotFilterDTO from "./resources/dtos/NFEStatusSnapshotFilterDTO";
import NFEStatusSnapshotFilterResultDTO from "./resources/dtos/NFEStatusSnapshotFilterResultDTO";

@Component({
  selector: 'app-root',
  templateUrl: './NFEStatusPage.component.html',
  styleUrls: ['./NFEStatusPage.component.sass']
})
export class NFEStatusPageComponent implements OnInit {
  title = 'nfestatus';

  selectedCaptureMoment: Date;
  authorizers: EnumAuthorizerDTO[];
  selectedAuthorizers: EnumAuthorizerDTO[];
  checkMostUnavailables: boolean;
  loadedNFEStatusSnapshots: NFEStatusSnapshotDTO[];
  totalNFEStatusSnapshotsRecords: number;
  isPaginationLoading: boolean;
  tableRowsSize: 10;

  constructor(private enumAuthorizerResource: EnumAuthorizerResource,
              private nfeStatusSnapshotResource: NFEStatusSnapshotResource) {

  }

  public ngOnInit() : void {
    this.enumAuthorizerResource.findAll((dtos: EnumAuthorizerDTO[]) => {
      this.authorizers = dtos;
    });
  }

  public paginationQuery(lazyLoadEvent: LazyLoadEvent) : void {
    let wantedPage = 0;

    if (lazyLoadEvent.first != 0) {
      wantedPage = Math.trunc(lazyLoadEvent.first / 10);//this.tableRowsSize);
    }

    let filter = new NFEStatusSnapshotFilterDTO();
    filter.authorizers = this.selectedAuthorizers;
    filter.captureMoment = this.selectedCaptureMoment;
    filter.mostUnavailables = this.checkMostUnavailables;
    filter.page = wantedPage;
    filter.rows = lazyLoadEvent.rows;

    this.isPaginationLoading = true;

    this.nfeStatusSnapshotResource.findPaginated(filter, (result: NFEStatusSnapshotFilterResultDTO) => {
      this.loadedNFEStatusSnapshots = result.results;
      this.totalNFEStatusSnapshotsRecords = result.totalRecords;

      this.isPaginationLoading = false;
    });
  }
}
