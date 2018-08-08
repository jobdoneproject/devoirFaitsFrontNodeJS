/* tslint:disable */
import { Injectable } from '@angular/core';
import { Message } from '../../models/Message';
import { Utilisateur } from '../../models/Utilisateur';
import { Salle } from '../../models/Salle';
import { Creneau } from '../../models/Creneau';
import { Groupe } from '../../models/Groupe';
import { Geocode } from '../../models/Geocode';
import { EducationNationale } from '../../models/EducationNationale';
import { Etablissement } from '../../models/Etablissement';
import { Userlog } from '../../models/Userlog';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Message: Message,
    Utilisateur: Utilisateur,
    Salle: Salle,
    Creneau: Creneau,
    Groupe: Groupe,
    Geocode: Geocode,
    EducationNationale: EducationNationale,
    Etablissement: Etablissement,
    Userlog: Userlog,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
