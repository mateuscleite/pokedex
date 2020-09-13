import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDash'
})
export class RemoveDashPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace("-", " ");
  }

}
