import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../model/model.user';
import {Utilisateur} from '../shared/sdk/models';

@Pipe({
    name: 'nomAndClasses'
})
export class NomAndClassesPipe implements PipeTransform {


    transform(utilisateurs: Utilisateur[], nom?: any): any {

        if (utilisateurs) {
            let output: Utilisateur[] = [];
            if (nom != null && nom != '') {
                for (let i = 0; i < utilisateurs.length; i++) {
                    if (utilisateurs[i].nom.toLowerCase().includes(nom.toLowerCase()) || utilisateurs[i].classeName.toLowerCase().includes(nom.toLowerCase())) {
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
