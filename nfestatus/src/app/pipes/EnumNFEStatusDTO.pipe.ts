import { Pipe, PipeTransform } from '@angular/core';

import EnumNFEStatusDTO from "../resources/dtos/EnumNFEStatusDTO";

@Pipe({name: 'enumNFEStatus'})
export default class EnumNFEStatusDTOPipe implements PipeTransform {
  transform(value: EnumNFEStatusDTO): string {
    return value.enumNFEStatusOrdinal == 3 ? "Desconhecido" : value.statusDescription;
  }
}