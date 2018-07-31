/* tslint:disable */
import {
  Salle
} from '../index';

declare var Object: any;
export interface EtablissementInterface {
  "id"?: number;
  "utilisateurId"?: any;
  salles?: Salle[];
}

export class Etablissement implements EtablissementInterface {
  "id": number;
  "utilisateurId": any;
  salles: Salle[];
  constructor(data?: EtablissementInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Etablissement`.
   */
  public static getModelName() {
    return "Etablissement";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Etablissement for dynamic purposes.
  **/
  public static factory(data: EtablissementInterface): Etablissement{
    return new Etablissement(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Etablissement',
      plural: 'etablissements',
      path: 'etablissements',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "utilisateurId": {
          name: 'utilisateurId',
          type: 'any'
        },
      },
      relations: {
        salles: {
          name: 'salles',
          type: 'Salle[]',
          model: 'Salle',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'etablissementId'
        },
      }
    }
  }
}
