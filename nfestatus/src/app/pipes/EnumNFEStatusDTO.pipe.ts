import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import EnumNFEStatusDTO from "../resources/dtos/EnumNFEStatusDTO";

@Pipe({name: 'enumNFEStatus'})
export default class EnumNFEStatusDTOPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }

  public transform(value: EnumNFEStatusDTO): string {
    let styledString = this.getStyleStringForNFEStatus(value);

    this.sanitizer.bypassSecurityTrustHtml(styledString);

    return styledString;
  }

  private getStyleStringForNFEStatus(value: EnumNFEStatusDTO) : string {
    const spanContent = "<span class=\"##\">#</span>";
    let styledString = "";

    switch (value.enumNFEStatusOrdinal) {
      case 0:
        styledString = spanContent.replace("##", "status-online");
        break;

      case 1:
        styledString = spanContent.replace("##", "status-failing");
        break;
      
      case 2:
        styledString = spanContent.replace("##", "status-offline");
        break;

      case 3:
        styledString = spanContent.replace("##", "status-unknown");
        break;
    }

    return styledString.replace("#", value.statusDescription);
  }
}