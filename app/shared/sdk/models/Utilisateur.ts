/* tslint:disable */
import {
  Etablissement
} from '../index';

declare var Object: any;
export interface UtilisateurInterface {
  "nom": string;
  "prenom": string;
  "disponible": boolean;
  "actif": boolean;
  "telephone": string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
  etabUAI?: Etablissement[];
}

export class Utilisateur implements UtilisateurInterface {
  "nom": string;
  "prenom": string;
  "disponible": boolean;
  "actif": boolean;
  "telephone": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  etabUAI: Etablissement[];
  constructor(data?: UtilisateurInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Utilisateur`.
   */
  public static getModelName() {
    return "Utilisateur";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Utilisateur for dynamic purposes.
  **/
  public static factory(data: UtilisateurInterface): Utilisateur{
    return new Utilisateur(data);
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
      name: 'Utilisateur',
      plural: 'utilisateurs',
      path: 'utilisateurs',
      idName: 'id',
      properties: {
        "nom": {
          name: 'nom',
          type: 'string'
        },
        "prenom": {
          name: 'prenom',
          type: 'string'
        },
        "disponible": {
          name: 'disponible',
          type: 'boolean'
        },
        "actif": {
          name: 'actif',
          type: 'boolean'
        },
        "telephone": {
          name: 'telephone',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        etabUAI: {
          name: 'etabUAI',
          type: 'Etablissement[]',
          model: 'Etablissement',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'utilisateurId'
        },
      }
    }
  }
}
