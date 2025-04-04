import { Pipe, PipeTransform } from '@angular/core';
import { Species } from '../interfaces/characters-response';

@Pipe({
  name: 'especie',
})
export class EspeciePipe implements PipeTransform {
  transform(value: string): string {
    if (value === Species.Alien) {
      return 'Alienígena';
    } else {
      return 'Humano';
    }
  }
}
