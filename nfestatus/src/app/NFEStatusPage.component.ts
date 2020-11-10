import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import EnumAuthorizerResource from "./resources/EnumAuthorizerResource";
import NFEStatusSnapshotResource from "./resources/NFEStatusSnapshotResource";
import EnumServiceResource from "./resources/EnumServiceResource";
import EnumAuthorizerDTO from "./resources/dtos/EnumAuthorizerDTO";
import EnumServiceDTO from "./resources/dtos/EnumServiceDTO";
import NFEStatusSnapshotDTO from "./resources/dtos/NFEStatusSnapshotDTO";
import NFEStatusSnapshotFilterDTO from "./resources/dtos/NFEStatusSnapshotFilterDTO";
import NFEStatusSnapshotFilterResultDTO from "./resources/dtos/NFEStatusSnapshotFilterResultDTO";
import NFEStatusSnapshotFilterMostUnavailableDTO from "./resources/dtos/NFEStatusSnapshotFilterMostUnavailableDTO";
import NFEStatusSnapshotFilterMostUnavailableResultDTO from "./resources/dtos/NFEStatusSnapshotFilterMostUnavailableResultDTO";
import NFEStatusSnapshotMostUnavailableDTO from "./resources/dtos/NFEStatusSnapshotMostUnavailableDTO";
import QueryOption, { queryByDistinctAuthorizerAndLatestCapture, queryTreatUnknownNFEStatusAsOffline } from "./data/QueryOption";

@Component({
  selector: 'app-root',
  templateUrl: './NFEStatusPage.component.html',
  styleUrls: ['./NFEStatusPage.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NFEStatusPageComponent implements OnInit {
  public authorizers: EnumAuthorizerDTO[];
  public services: EnumServiceDTO[];
  public initialized = false;
  public queryOptions: QueryOption[] = [
    queryByDistinctAuthorizerAndLatestCapture,
    queryTreatUnknownNFEStatusAsOffline
  ];

  public loadedNFEStatusSnapshots: NFEStatusSnapshotDTO[];
  public totalNFEStatusSnapshotsRecords: number;
  public loadedNFEStatusSnapshotMostUnavailables: NFEStatusSnapshotMostUnavailableDTO[];
  public totalNFEStatusSnapshotMostUnavailableRecords: number;

  public selectedCaptureMoment: Date;
  public selectedAuthorizers: EnumAuthorizerDTO[];
  public selectedMostUnavailableServices: EnumServiceDTO[] = [];
  public selectedQueryOptions = Array.from(this.queryOptions);

  public isPaginationLoading = true;
  public tableVisible = true;
  public tableRowsSize = 10;

  public constructor(private enumAuthorizerResource: EnumAuthorizerResource,
                     private nfeStatusSnapshotResource: NFEStatusSnapshotResource,
                     private enumServiceResource: EnumServiceResource,
                     private confirmationService: ConfirmationService) {

  }

  public ngOnInit() : void {
    this.enumAuthorizerResource.findAll(
      this.handleAuthorizerInitFindAllResponse.bind(this),
      this.displayNetworkErrorDialog.bind(this)
    );
  }

  public queryByAuthorizersAndDatePaginated(lazyLoadEvent: LazyLoadEvent) : void {
    if (this.initialized) {
      let filter = new NFEStatusSnapshotFilterDTO();
      filter.authorizers = this.selectedAuthorizers;
      filter.captureMoment = this.selectedCaptureMoment;
      filter.page = this.resolveWantedPage(lazyLoadEvent);
      filter.rows = lazyLoadEvent.rows;
      filter.distinctByAuthorizerLatest = this.isQueryOptionSelected(queryByDistinctAuthorizerAndLatestCapture);;
  
      this.isPaginationLoading = true;
  
      this.nfeStatusSnapshotResource.queryByAuthorizersAndDatePaginated(filter, (result: NFEStatusSnapshotFilterResultDTO) => {
        this.loadedNFEStatusSnapshots = result.results;
        this.totalNFEStatusSnapshotsRecords = result.totalRecords;
  
        this.isPaginationLoading = false;
      });
    }
  }

  public queryByMostUnavailableServicesPaginated (lazyLoadEvent: LazyLoadEvent) : void {
    if (this.initialized) {
      let filter = new NFEStatusSnapshotFilterMostUnavailableDTO();
      filter.page = this.resolveWantedPage(lazyLoadEvent);
      filter.rows = lazyLoadEvent.rows;
      filter.services = this.selectedMostUnavailableServices;
      filter.treatUnknownStatusAsOffline = this.isQueryOptionSelected(queryTreatUnknownNFEStatusAsOffline);
  
      this.isPaginationLoading = true;
  
      this.nfeStatusSnapshotResource.queryByMostUnavailableServicesPaginated(filter, (result: NFEStatusSnapshotFilterMostUnavailableResultDTO) => {
        this.loadedNFEStatusSnapshotMostUnavailables = result.results;
        this.totalNFEStatusSnapshotMostUnavailableRecords = result.totalRecords;
  
        this.isPaginationLoading = false;
      });
    }
  };

  public shouldDisplayMostUnavailableServicesTable() : boolean  {
    return this.selectedMostUnavailableServices.length > 0;
  };

  public shouldDisableAllFields() : boolean {
    return this.isPaginationLoading;
  };

  public refreshTable() : void {
    this.tableVisible = false;
    setTimeout(() => this.tableVisible = true, 0);
  }

  private resolveWantedPage(lazyLoadEvent: LazyLoadEvent) {
    let wantedPage = 0;

    if (lazyLoadEvent.first != 0) {
      wantedPage = Math.trunc(lazyLoadEvent.first / this.tableRowsSize);
    }

    return wantedPage;
  }

  private isQueryOptionSelected(queryOption : QueryOption) : boolean {
    return this.selectedQueryOptions.includes(queryOption);
  }

  private handleAuthorizerInitFindAllResponse(dtos: EnumAuthorizerDTO[]) : void {
    this.authorizers = Array.from(dtos);
    this.selectedAuthorizers = Array.from(dtos);

    this.enumServiceResource.findAll(
      this.handleServiceInitFindAllResponse.bind(this),
      this.displayNetworkErrorDialog.bind(this)
    );
  }

  private handleServiceInitFindAllResponse(dtos: EnumServiceDTO[]) : void {
    this.services = Array.from(dtos);

    this.initialized = true;
    this.refreshTable();
  }

  private displayNetworkErrorDialog(error: HttpErrorResponse) : void {
    this.isPaginationLoading = false;

    this.confirmationService.confirm({
      message: "Não foi possível conectar-se ao servidor de Status NF-e (" + error.status + " " + error.statusText + ")",
      accept: () => { location.reload() },
      acceptLabel: "Tentar novamente",
      acceptIcon: "pi pi-refresh",
      rejectVisible: false
    });
  }
}
