/* tslint:disable */

declare var Object: any;
export interface EducationNationaleInterface {
  "id"?: number;
}

export class EducationNationale implements EducationNationaleInterface {
  "id": number;
  constructor(data?: EducationNationaleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EducationNationale`.
   */
  public static getModelName() {
    return "EducationNationale";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EducationNationale for dynamic purposes.
  **/
  public static factory(data: EducationNationaleInterface): EducationNationale{
    return new EducationNationale(data);
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
      name: 'EducationNationale',
      plural: 'educationNationaleAPI',
      path: 'educationNationaleAPI',
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
