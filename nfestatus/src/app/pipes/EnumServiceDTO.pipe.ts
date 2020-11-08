import { Pipe, PipeTransform } from '@angular/core';

import EnumServiceDTO from "../resources/dtos/EnumServiceDTO";

@Pipe({name: 'enumService'})
export default class EnumServiceDTOPipe implements PipeTransform {
  transform(value: EnumServiceDTO): string {
    return value.serviceDescription;
  }
}