/* tslint:disable */
import {
  Etablissement
} from '../index';

declare var Object: any;
export interface UtilisateurInterface {
  "nom": string;
  "prenom": string;
  "privilege": string;
  "ville": string;
  "disponible": boolean;
  "classeName": boolean;
  "actif": boolean;
  "telephone"?: string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "numero_uai"?: string;
  "password"?: string;
  accessTokens?: any[];
  idEtablissement?: Etablissement;
}

export class Utilisateur implements UtilisateurInterface {
  "nom": string;
  "prenom": string;
  "privilege": string;
  "ville": string;
  "disponible": boolean;
  "classeName": boolean;
  "actif": boolean;
  "telephone": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "numero_uai": string;
  "password": string;
  accessTokens: any[];
  idEtablissement: Etablissement;
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
        "privilege": {
          name: 'privilege',
          type: 'string'
        },
        "ville": {
          name: 'ville',
          type: 'string'
        },
        "disponible": {
          name: 'disponible',
          type: 'boolean'
        },
        "classeName": {
          name: 'classeName',
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
        "numero_uai": {
          name: 'numero_uai',
          type: 'string'
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
        idEtablissement: {
          name: 'idEtablissement',
          type: 'Etablissement',
          model: 'Etablissement',
          relationType: 'belongsTo',
                  keyFrom: 'numero_uai',
          keyTo: 'numero_uai'
        },
      }
    }
  }
}
