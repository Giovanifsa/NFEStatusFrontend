import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nfeAverageTime'})
export default class NFEAverageTimePipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
        return "N/D";
    }

    return value + " segundo(s)";
  }
}