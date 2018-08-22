/* tslint:disable */

declare var Object: any;
export interface CommunicationInterface {
  "idMessage": string;
  "contenu": string;
  "date_message": string;
  "id"?: any;
}

export class Communication implements CommunicationInterface {
  "idMessage": string;
  "contenu": string;
  "date_message": string;
  "id": any;
  constructor(data?: CommunicationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Communication`.
   */
  public static getModelName() {
    return "Communication";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Communication for dynamic purposes.
  **/
  public static factory(data: CommunicationInterface): Communication{
    return new Communication(data);
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
      name: 'Communication',
      plural: 'communications',
      path: 'communications',
      idName: 'id',
      properties: {
        "idMessage": {
          name: 'idMessage',
          type: 'string'
        },
        "contenu": {
          name: 'contenu',
          type: 'string'
        },
        "date_message": {
          name: 'date_message',
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
