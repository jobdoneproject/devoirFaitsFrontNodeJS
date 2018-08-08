/* tslint:disable */
import {
  Salle
} from '../index';

declare var Object: any;
export interface CreneauInterface {
  "dateDebut": Date;
  "dateFin": Date;
  "id"?: any;
  "salleId"?: any;
  "etablissementId"?: string;
  salle?: Salle;
}

export class Creneau implements CreneauInterface {
  "dateDebut": Date;
  "dateFin": Date;
  "id": any;
  "salleId": any;
  "etablissementId": string;
  salle: Salle;
  constructor(data?: CreneauInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Creneau`.
   */
  public static getModelName() {
    return "Creneau";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Creneau for dynamic purposes.
  **/
  public static factory(data: CreneauInterface): Creneau{
    return new Creneau(data);
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
      name: 'Creneau',
      plural: 'creneaux',
      path: 'creneaux',
      idName: 'id',
      properties: {
        "dateDebut": {
          name: 'dateDebut',
          type: 'Date'
        },
        "dateFin": {
          name: 'dateFin',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "salleId": {
          name: 'salleId',
          type: 'any'
        },
        "etablissementId": {
          name: 'etablissementId',
          type: 'string'
        },
      },
      relations: {
        salle: {
          name: 'salle',
          type: 'Salle',
          model: 'Salle',
          relationType: 'belongsTo',
                  keyFrom: 'salleId',
          keyTo: 'id'
        },
      }
    }
  }
}
