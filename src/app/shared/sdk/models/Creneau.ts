/* tslint:disable */

declare var Object: any;
export interface CreneauInterface {
  "idCreneau"?: string;
  "dateDebut": number;
  "dateFin": number;
  "professeursCreneau": any;
  "elevesCreneau": any;
  "salleId"?: string;
  "etablissementId"?: string;
}

export class Creneau implements CreneauInterface {
  "idCreneau": string;
  "dateDebut": number;
  "dateFin": number;
  "professeursCreneau": any;
  "elevesCreneau": any;
  "salleId": string;
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
      idName: 'idCreneau',
      properties: {
        "idCreneau": {
          name: 'idCreneau',
          type: 'string'
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
        "salleId": {
          name: 'salleId',
          type: 'string'
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
