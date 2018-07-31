/* tslint:disable */
import {
  Creneau
} from '../index';

declare var Object: any;
export interface SalleInterface {
  "nom": string;
  "id"?: any;
  "etablissementId"?: number;
  creneaux?: Creneau[];
}

export class Salle implements SalleInterface {
  "nom": string;
  "id": any;
  "etablissementId": number;
  creneaux: Creneau[];
  constructor(data?: SalleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Salle`.
   */
  public static getModelName() {
    return "Salle";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Salle for dynamic purposes.
  **/
  public static factory(data: SalleInterface): Salle{
    return new Salle(data);
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
      name: 'Salle',
      plural: 'salles',
      path: 'salles',
      idName: 'id',
      properties: {
        "nom": {
          name: 'nom',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "etablissementId": {
          name: 'etablissementId',
          type: 'number'
        },
      },
      relations: {
        creneaux: {
          name: 'creneaux',
          type: 'Creneau[]',
          model: 'Creneau',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'salleId'
        },
      }
    }
  }
}
