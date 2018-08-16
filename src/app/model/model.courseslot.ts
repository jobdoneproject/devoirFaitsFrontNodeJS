import { User } from "./model.user";
import { Room } from "./model.room";
import { Utilisateur } from '../shared/sdk/models';
import { Salle } from '../shared/sdk/models';

export class CourseSlot {
    idCreneau: number;
    dateDebut: number;
    dateFin: number;
    professeursCreneau: Utilisateur[];
    elevesCreneau: Utilisateur[];
    salleId: string;
}