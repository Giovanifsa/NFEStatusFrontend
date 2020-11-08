import { Pipe, PipeTransform } from '@angular/core';

import EnumAuthorizerDTO from "../resources/dtos/EnumAuthorizerDTO";

@Pipe({name: 'enumAuthorizer'})
export default class EnumAuthorizerDTOPipe implements PipeTransform {
  transform(value: EnumAuthorizerDTO): string {
    return value.authorizer;
  }
}