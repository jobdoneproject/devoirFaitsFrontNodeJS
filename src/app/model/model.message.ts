import { User } from "./model.user";
import {Utilisateur} from '../shared/sdk/models';

export class Message {
    idMessage: number;
    contenu: String;
    dateMessage: number;
    redacteur: Utilisateur;
    //utilisateur: User;
    eleve: Utilisateur;
}
