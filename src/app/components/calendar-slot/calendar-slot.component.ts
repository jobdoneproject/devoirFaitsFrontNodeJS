import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {duration, utc} from 'moment';
import {CourseSlot} from '../../model/model.course-slots';
import {User} from '../../model/model.user';
import {CreneauService} from '../../services/creneau.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UtilisateurApi} from '../../shared/sdk';
import {Utilisateur, AccessToken} from '../../shared/sdk/models';
import {Creneau} from '../../shared/sdk/models';
import {SalleApi} from '../../shared/sdk';
import {RoomService} from '../../services/room.service';
import {Room} from '../../model/model.room';
import { Salle } from '../../shared/sdk/models';
import {CreneauApi} from '../../shared/sdk/';
import {AuthGuard} from '../../shared/auth.guard';
import {EtablissementApi} from '../../shared/sdk';


@Component({
    selector: 'calendar-slot',
    templateUrl: './calendar-slot.component.html',
    styleUrls: ['./calendar-slot.component.scss']
})
export class CalendarSlotComponent implements OnInit {

    currentUser: Utilisateur;
    @Output() onDeleteEvent = new EventEmitter<any>();
    administrateur: boolean;
    deletedSlot: Creneau;
    idEtablissement: string;
    salleName: string;
    @Input() private slotValue: Creneau;
    constructor(private userService: UtilisateurApi, private etablissementAPI: EtablissementApi, private salleApi: SalleApi, private roomsv: RoomService, private creneauService: CreneauService, private router: Router) {
        this.currentUser = this.userService.getCachedCurrent();
        this.idEtablissement = this.currentUser.numero_uai;


        if (this.currentUser.privilege === 'Administrateur') {
            this.administrateur = true;
        }
    }

    public get slot(): Creneau {
        return this.slotValue;
    }

    public get teachers(): String[] {
        const arrayToReturn: String[] = [];
        for (const currentTeacher of this.slotValue.professeursCreneau) {
            arrayToReturn.push(`${currentTeacher.nom} ${currentTeacher.prenom}`);
        }
        return arrayToReturn;
    }

    public get duration(): Date {
        const durationInstance = this.slotValue.dateFin - this.slotValue.dateDebut;
        const date = new Date(1970, 0, 1);
        date.setSeconds(durationInstance);
        return date;
    }

      public get salle(): String {
            if (this.slotValue.salleId) {
                return this.slotValue.salleId;
            }
            return ' non définie';
        }

    public get adresseCreneau(): String {
        let adresse: String;
        if (this.currentUser.privilege === 'Administrateur') {
            adresse = `creneau/${this.slotValue.idCreneau}`;
        } else if (this.currentUser.privilege === 'professeur') {
            adresse = `liste-appel/${this.slotValue.idCreneau}`;
        } else { adresse = undefined; }
        return adresse;
    }

    ngOnInit() {
    }

    allerSurPageCreneau() {
        if (this.currentUser.privilege === 'Administrateur'
            || this.currentUser.privilege === 'professeur') {
            this.router.navigate([this.adresseCreneau]);
        }
    }

    deleteSlot(slotId: string) {
        let savedDeletedSlot: Creneau;
        this.creneauService.getSlot(this.currentUser.numero_uai, slotId).subscribe((data: Creneau) => {
            savedDeletedSlot = data;
            this.onDeleteEvent.emit(savedDeletedSlot);
            this.creneauService.deleteSelected(this.currentUser.numero_uai, slotId);

        });
    }

    goToChecklist(slotId: string) {
        this.router.navigate(['liste-appel/' + slotId]);
    }


}
