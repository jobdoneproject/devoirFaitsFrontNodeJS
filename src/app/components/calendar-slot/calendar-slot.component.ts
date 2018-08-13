import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {duration, utc} from 'moment';
import {CourseSlot} from '../../model/model.course-slots';
import {User} from '../../model/model.user';
import {CreneauService} from '../../services/creneau.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UtilisateurApi} from '../../shared/sdk';
import {Utilisateur, AccessToken} from '../../shared/sdk/models';
import {AuthGuard} from '../../shared/auth.guard';


@Component({
    selector: 'calendar-slot',
    templateUrl: './calendar-slot.component.html',
    styleUrls: ['./calendar-slot.component.scss']
})
export class CalendarSlotComponent implements OnInit {

    currentUser: Utilisateur;
    @Output() onDeleteEvent = new EventEmitter<any>();
    administrateur: boolean = false;
    deletedSlot: CourseSlot;
    @Input() private slotValue: CourseSlot;

    constructor(private userService: UtilisateurApi, private creneauService: CreneauService, private router: Router) {
        this.currentUser = this.userService.getCachedCurrent();

        if (this.currentUser.privilege == 'Administrateur') {
            this.administrateur = true;
        }
    }

    public get slot(): CourseSlot {
        return this.slotValue;
    }

    public get teachers(): String[] {
        let arrayToReturn: String[] = [];
        for (let currentTeacher of this.slotValue.professeurs) {
            arrayToReturn.push(`${currentTeacher.nom} ${currentTeacher.prenom}`);
        }
        return arrayToReturn;
    }

    public get duration(): Date {
        const durationInstance = this.slotValue.dateFin - this.slotValue.dateDebut;
        let date = new Date(1970, 0, 1);
        date.setSeconds(durationInstance);
        return date;
    }

    public get salle(): String {
        if (this.slotValue.salle) {
            return this.slotValue.salle.nom;
        }
        console.log(this.slotValue.salle)
        return ' non définie';
    }

    public get adresseCreneau(): String {
        let adresse: String;
        if (this.currentUser.privilege === "Administrateur") {
            adresse = `creneau/${this.slotValue.idCreneau}`;
        }
        else if (this.currentUser.privilege === "Professeur") {
            adresse = `liste-appel/${this.slotValue.idCreneau}`;
        }
        else adresse = undefined;
        return adresse;
    }

    ngOnInit() {
    }

    allerSurPageCreneau() {
        if (this.currentUser.privilege === "Administrateur"
            || this.currentUser.privilege === "Professeur") {
            this.router.navigate([this.adresseCreneau]);
        }
    }

    deleteSlot(slotId: number) {
        let savedDeletedSlot: CourseSlot;
        this.creneauService.getSlot(this.currentUser.numero_uai, slotId).subscribe((data: CourseSlot) => {
            savedDeletedSlot = data;
            this.onDeleteEvent.emit(savedDeletedSlot);
            this.creneauService.deleteSelected(this.currentUser.numero_uai, slotId);

        });
    }

    goToChecklist(slotId: number) {
        this.router.navigate(['liste-appel/' + slotId]);
    }


}
