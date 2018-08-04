/* tslint:disable */
import {
  Utilisateur
} from '../index';

declare var Object: any;
export interface EtablissementInterface {
  "numero_uai"?: string;
  "localite_acheminement_uai": string;
  "secteur_public_prive_libe": string;
  "etat_etablissement": string;
  "libelle_region": string;
  "code_postal_uai": string;
  "code_region": string;
  "epsg"?: string;
  "nature_uai_libe"?: string;
  "appellation_officielle"?: string;
  "latitude"?: string;
  "coordonnee_y"?: string;
  "coordonnee_x"?: string;
  "adresse_uai"?: string;
  "code_commune"?: string;
  "localisation"?: string;
  "libelle_commune"?: string;
  "code_departement"?: string;
  "etat_etablissement_libe"?: string;
  "nature_uai"?: string;
  "libelle_departement"?: string;
  "code_academie"?: string;
  "appariement"?: string;
  "longitude"?: string;
  "patronyme_uai"?: string;
  "denomination_principale"?: string;
  "libelle_academie"?: string;
  "position"?: Array<any>;
  utilisateurs?: Utilisateur[];
}

export class Etablissement implements EtablissementInterface {
  "numero_uai": string;
  "localite_acheminement_uai": string;
  "secteur_public_prive_libe": string;
  "etat_etablissement": string;
  "libelle_region": string;
  "code_postal_uai": string;
  "code_region": string;
  "epsg": string;
  "nature_uai_libe": string;
  "appellation_officielle": string;
  "latitude": string;
  "coordonnee_y": string;
  "coordonnee_x": string;
  "adresse_uai": string;
  "code_commune": string;
  "localisation": string;
  "libelle_commune": string;
  "code_departement": string;
  "etat_etablissement_libe": string;
  "nature_uai": string;
  "libelle_departement": string;
  "code_academie": string;
  "appariement": string;
  "longitude": string;
  "patronyme_uai": string;
  "denomination_principale": string;
  "libelle_academie": string;
  "position": Array<any>;
  utilisateurs: Utilisateur[];
  constructor(data?: EtablissementInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Etablissement`.
   */
  public static getModelName() {
    return "Etablissement";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Etablissement for dynamic purposes.
  **/
  public static factory(data: EtablissementInterface): Etablissement{
    return new Etablissement(data);
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
      name: 'Etablissement',
      plural: 'Etablissements',
      path: 'Etablissements',
      idName: 'numero_uai',
      properties: {
        "numero_uai": {
          name: 'numero_uai',
          type: 'string'
        },
        "localite_acheminement_uai": {
          name: 'localite_acheminement_uai',
          type: 'string'
        },
        "secteur_public_prive_libe": {
          name: 'secteur_public_prive_libe',
          type: 'string'
        },
        "etat_etablissement": {
          name: 'etat_etablissement',
          type: 'string'
        },
        "libelle_region": {
          name: 'libelle_region',
          type: 'string'
        },
        "code_postal_uai": {
          name: 'code_postal_uai',
          type: 'string'
        },
        "code_region": {
          name: 'code_region',
          type: 'string'
        },
        "epsg": {
          name: 'epsg',
          type: 'string'
        },
        "nature_uai_libe": {
          name: 'nature_uai_libe',
          type: 'string'
        },
        "appellation_officielle": {
          name: 'appellation_officielle',
          type: 'string'
        },
        "latitude": {
          name: 'latitude',
          type: 'string'
        },
        "coordonnee_y": {
          name: 'coordonnee_y',
          type: 'string'
        },
        "coordonnee_x": {
          name: 'coordonnee_x',
          type: 'string'
        },
        "adresse_uai": {
          name: 'adresse_uai',
          type: 'string'
        },
        "code_commune": {
          name: 'code_commune',
          type: 'string'
        },
        "localisation": {
          name: 'localisation',
          type: 'string'
        },
        "libelle_commune": {
          name: 'libelle_commune',
          type: 'string'
        },
        "code_departement": {
          name: 'code_departement',
          type: 'string'
        },
        "etat_etablissement_libe": {
          name: 'etat_etablissement_libe',
          type: 'string'
        },
        "nature_uai": {
          name: 'nature_uai',
          type: 'string'
        },
        "libelle_departement": {
          name: 'libelle_departement',
          type: 'string'
        },
        "code_academie": {
          name: 'code_academie',
          type: 'string'
        },
        "appariement": {
          name: 'appariement',
          type: 'string'
        },
        "longitude": {
          name: 'longitude',
          type: 'string'
        },
        "patronyme_uai": {
          name: 'patronyme_uai',
          type: 'string'
        },
        "denomination_principale": {
          name: 'denomination_principale',
          type: 'string'
        },
        "libelle_academie": {
          name: 'libelle_academie',
          type: 'string'
        },
        "position": {
          name: 'position',
          type: 'Array&lt;any&gt;'
        },
      },
      relations: {
        utilisateurs: {
          name: 'utilisateurs',
          type: 'Utilisateur[]',
          model: 'Utilisateur',
          relationType: 'hasMany',
                  keyFrom: 'numero_uai',
          keyTo: 'numero_uai'
        },
      }
    }
  }
}
