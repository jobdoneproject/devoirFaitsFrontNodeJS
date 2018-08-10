import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/model.user';
import {Utilisateur} from '../shared/sdk/models';

@Pipe({
  name: 'eleveClasses'
})

export class EleveClassesPipe implements PipeTransform {


  transform(utilisateurs: Utilisateur[], classe?: any): any {

    if (utilisateurs) {
      const output: Utilisateur[] = [];
      if (classe != 'Toutes') {
        for (let i = 0; i < utilisateurs.length; i++) {
          if (utilisateurs[i].classeName === classe) {
            output.push(utilisateurs[i]);
          }
        }
        return output;
      } else {
        for (let i = 0; i < utilisateurs.length; i++) {
          output.push(utilisateurs[i]);
        }
        return output;
      }
    }
  }
}
