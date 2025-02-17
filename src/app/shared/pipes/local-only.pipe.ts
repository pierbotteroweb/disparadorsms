import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localOnly'
})
export class LocalOnlyPipe implements PipeTransform {

  transform(value: string): boolean {

    if(value.substring(0,2)==="11"){
      return false
    } else {
      return true
    }
  }

}
