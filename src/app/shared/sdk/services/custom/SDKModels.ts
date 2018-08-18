/* tslint:disable */
import { Injectable } from '@angular/core';
import { Message } from '../../models/Message';
import { Utilisateur } from '../../models/Utilisateur';
import { Salle } from '../../models/Salle';
import { Creneau } from '../../models/Creneau';
import { Groupe } from '../../models/Groupe';
import { Geocode } from '../../models/Geocode';
import { Etablissement } from '../../models/Etablissement';
import { Userlog } from '../../models/Userlog';
import { Communication } from '../../models/Communication';

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
    Etablissement: Etablissement,
    Userlog: Userlog,
    Communication: Communication,
    
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
