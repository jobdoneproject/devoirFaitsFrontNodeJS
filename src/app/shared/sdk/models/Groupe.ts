/* tslint:disable */

declare var Object: any;
export interface GroupeInterface {
  "nom": string;
  "id"?: any;
}

export class Groupe implements GroupeInterface {
  "nom": string;
  "id": any;
  constructor(data?: GroupeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Groupe`.
   */
  public static getModelName() {
    return "Groupe";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Groupe for dynamic purposes.
  **/
  public static factory(data: GroupeInterface): Groupe{
    return new Groupe(data);
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
      name: 'Groupe',
      plural: 'groupes',
      path: 'groupes',
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
      },
      relations: {
      }
    }
  }
}
