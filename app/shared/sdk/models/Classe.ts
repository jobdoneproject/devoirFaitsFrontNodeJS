/* tslint:disable */

declare var Object: any;
export interface ClasseInterface {
  "nom": string;
  "id"?: any;
}

export class Classe implements ClasseInterface {
  "nom": string;
  "id": any;
  constructor(data?: ClasseInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Classe`.
   */
  public static getModelName() {
    return "Classe";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Classe for dynamic purposes.
  **/
  public static factory(data: ClasseInterface): Classe{
    return new Classe(data);
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
      name: 'Classe',
      plural: 'classes',
      path: 'classes',
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
