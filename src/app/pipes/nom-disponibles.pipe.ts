import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../model/model.user';
import {Utilisateur} from '../shared/sdk/models';

@Pipe({
    name: 'nomDisponibles'
})
export class NomDisponiblesPipe implements PipeTransform {

    //utilisateurs:User[] = [];

    transform(utilisateurs: Utilisateur[], nom?: any): any {

        if (utilisateurs) {
            var output: Utilisateur[] = [];
            if (nom != null && nom != '') {
                for (var i = 0; i < utilisateurs.length; i++) {
                    if (utilisateurs[i].nom.toLowerCase().includes(nom.toLowerCase())) {
                        output.push(utilisateurs[i]);
                    }
                }
                return output;
            } else {
                for (var i = 0; i < utilisateurs.length; i++) {
                    output.push(utilisateurs[i]);
                }
                return output;
            }
        }
    }
}
