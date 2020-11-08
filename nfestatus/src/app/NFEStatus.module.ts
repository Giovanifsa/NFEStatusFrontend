import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NFEStatusPageComponent } from './NFEStatusPage.component';
import EnumAuthorizerDTOPipe from './pipes/EnumAuthorizerDTO.pipe';
import EnumNFEStatusDTOPipe from "./pipes/EnumNFEStatusDTO.pipe";
import EnumServiceDTOPipe from "./pipes/EnumServiceDTO.pipe";

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    NFEStatusPageComponent,
    EnumAuthorizerDTOPipe,
    EnumNFEStatusDTOPipe,
    EnumServiceDTOPipe
  ],
  imports: [
    BrowserModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CheckboxModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [NFEStatusPageComponent]
})

export class NFEStatusModule { }
