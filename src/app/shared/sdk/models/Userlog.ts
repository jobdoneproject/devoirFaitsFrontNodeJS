/* tslint:disable */

declare var Object: any;
export interface UserlogInterface {
  "userFirstName": string;
  "userSirName": string;
  "userEmail": string;
  "logindatetime": Date;
  "actionType": string;
  "id"?: any;
}

export class Userlog implements UserlogInterface {
  "userFirstName": string;
  "userSirName": string;
  "userEmail": string;
  "logindatetime": Date;
  "actionType": string;
  "id": any;
  constructor(data?: UserlogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Userlog`.
   */
  public static getModelName() {
    return "Userlog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Userlog for dynamic purposes.
  **/
  public static factory(data: UserlogInterface): Userlog{
    return new Userlog(data);
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
      name: 'Userlog',
      plural: 'Userlogs',
      path: 'Userlogs',
      idName: 'id',
      properties: {
        "userFirstName": {
          name: 'userFirstName',
          type: 'string'
        },
        "userSirName": {
          name: 'userSirName',
          type: 'string'
        },
        "userEmail": {
          name: 'userEmail',
          type: 'string'
        },
        "logindatetime": {
          name: 'logindatetime',
          type: 'Date'
        },
        "actionType": {
          name: 'actionType',
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
