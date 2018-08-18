/* tslint:disable */

declare var Object: any;
export interface CreneauInterface {
  "idCreneau"?: any;
  "dateDebut": number;
  "dateFin": number;
  "professeursCreneau": any;
  "elevesCreneau": any;
  "id"?: any;
  "salleId"?: any;
  "etablissementId"?: string;
}

export class Creneau implements CreneauInterface {
  "idCreneau": any;
  "dateDebut": number;
  "dateFin": number;
  "professeursCreneau": any;
  "elevesCreneau": any;
  "id": any;
  "salleId": any;
  "etablissementId": string;
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
        "idCreneau": {
          name: 'idCreneau',
          type: 'any'
        },
        "dateDebut": {
          name: 'dateDebut',
          type: 'number'
        },
        "dateFin": {
          name: 'dateFin',
          type: 'number'
        },
        "professeursCreneau": {
          name: 'professeursCreneau',
          type: 'any'
        },
        "elevesCreneau": {
          name: 'elevesCreneau',
          type: 'any'
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
      }
    }
  }
}
