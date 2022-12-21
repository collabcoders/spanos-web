import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {

  transform(value: string): string[] {
    if (value.indexOf(',') != -1) {
      return value.split(',');
    } else {
      return [value];
    }
  }
}
