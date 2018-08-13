/* tslint:disable */

declare var Object: any;
export interface SalleInterface {
  "idSalle"?: any;
  "nom": string;
  "etablissementId"?: string;
}

export class Salle implements SalleInterface {
  "idSalle": any;
  "nom": string;
  "etablissementId": string;
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
      idName: 'idSalle',
      properties: {
        "idSalle": {
          name: 'idSalle',
          type: 'any'
        },
        "nom": {
          name: 'nom',
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
