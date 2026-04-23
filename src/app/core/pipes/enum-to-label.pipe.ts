import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToLabel',
})
export class EnumToLabelPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
