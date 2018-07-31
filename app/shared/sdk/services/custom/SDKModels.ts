/* tslint:disable */
import { Injectable } from '@angular/core';
import { Message } from '../../models/Message';
import { Utilisateur } from '../../models/Utilisateur';
import { Classe } from '../../models/Classe';
import { Etablissement } from '../../models/Etablissement';
import { Salle } from '../../models/Salle';
import { Creneau } from '../../models/Creneau';
import { Groupe } from '../../models/Groupe';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Message: Message,
    Utilisateur: Utilisateur,
    Classe: Classe,
    Etablissement: Etablissement,
    Salle: Salle,
    Creneau: Creneau,
    Groupe: Groupe,
    
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
