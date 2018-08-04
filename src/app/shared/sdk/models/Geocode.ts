/* tslint:disable */

declare var Object: any;
export interface GeocodeInterface {
  "id"?: number;
}

export class Geocode implements GeocodeInterface {
  "id": number;
  constructor(data?: GeocodeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Geocode`.
   */
  public static getModelName() {
    return "Geocode";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Geocode for dynamic purposes.
  **/
  public static factory(data: GeocodeInterface): Geocode{
    return new Geocode(data);
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
      name: 'Geocode',
      plural: 'geocodes',
      path: 'geocodes',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
