import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {Router} from '@angular/router';

import {User} from '../../model/model.user';
import {CreneauService} from '../../services/creneau.service';
import {CourseSlot} from '../../model/model.courseslot';
import {Room} from '../../model/model.room';
import {Creneau, Salle, UtilisateurApi} from '../../shared/sdk';
import {AuthGuard} from '../../shared/auth.guard';
import {Utilisateur} from '../../shared/sdk/models';


@Component({
    selector: 'app-liste-appel',
    templateUrl: './liste-appel.component.html',
    styleUrls: ['./liste-appel.component.scss']
})
export class ListeAppelComponent implements OnInit {

    currentUser: Utilisateur;
    professeur: boolean;
    idEtablissement: string;
    salleId: string;
    idCreneau: string;
    editedCreneau: Creneau;
    creneauId: string;
    selectedProfesseurs: Utilisateur[] = [];
    selectedEleves: Utilisateur[] = [];
    titre: String;
    listeProfesseurs: String;
    dateDebut: number;
    dateFin: number;



    constructor(private route: ActivatedRoute,
                private creneauService: CreneauService,
                public router: Router,
                private userService: UtilisateurApi,
                private courseservice: CreneauService) {

        this.currentUser = this.userService.getCachedCurrent();
        this.idEtablissement = this.currentUser.numero_uai;

        if (this.currentUser.privilege === 'Professeur' || this.currentUser.privilege === 'Administrateur') {
            this.professeur = true;
        }

        this.idCreneau = this.route.snapshot.paramMap.get('id');
        // this.idCreneau = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.getSlot();

    }

    ngOnInit() {
    }

    public getSlot() {
        this.creneauService.getSlot(this.idEtablissement, this.idCreneau)
            .subscribe((data: Creneau) => {
                this.editedCreneau = data;
                this.creneauId = data.idCreneau;
                this.editedCreneau.professeursCreneau = data.professeursCreneau;
                // this.date_creneau = moment.unix(this.editedCreneau.dateDebut).format("YYYY-MM-DD");
                // this.heure_debut =  moment.unix(this.editedCreneau.dateDebut).format("HH:mm");
                // this.heure_fin =  moment.unix(this.editedCreneau.dateFin).format("HH:mm");
                this.salleId = this.editedCreneau.salleId;
                this.dateDebut = this.editedCreneau.dateDebut;
                this.dateFin = this.editedCreneau.dateFin;
                this.selectedProfesseurs = this.editedCreneau.professeursCreneau;
                this.selectedEleves = this.editedCreneau.elevesCreneau;

                // Backup edited Creneau
                // this.creneauEditedBackup = this.editedCreneau;

                this.updateTitre(this.editedCreneau.dateDebut);

                this.listeProfesseurs = '' + this.selectedProfesseurs[0].prenom;
                this.listeProfesseurs += ' ' + this.selectedProfesseurs[0].nom;
                if (this.selectedProfesseurs.length > 1) {
                    for (let i = 1; i < this.selectedProfesseurs.length; i++) {
                        this.listeProfesseurs += ', ' + this.selectedProfesseurs[i].prenom;
                        this.listeProfesseurs += ' ' + this.selectedProfesseurs[i].nom;
                    }
                }
            });
    }

    onSend() {
        this.courseservice.prepareEditedTimeSlot(
            this.editedCreneau.idCreneau,
            this.dateDebut,
            this.dateFin,
            this.selectedEleves,
            this.selectedProfesseurs,
            this.salleId,
            this.idEtablissement);
    }


    updateTitre(dateDebut) {
        const titreDateMois = moment.unix(dateDebut).format('MM');
        let moisString = '';
        switch (titreDateMois) {
            case '01':
                moisString = 'janvier';
                break;
            case '02':
                moisString = 'février';
                break;
            case '03':
                moisString = 'mars';
                break;
            case '04':
                moisString = 'avril';
                break;
            case '05':
                moisString = 'mai';
                break;
            case '06':
                moisString = 'juin';
                break;
            case '07':
                moisString = 'juillet';
                break;
            case '08':
                moisString = 'août';
                break;
            case '09':
                moisString = 'septembre';
                break;
            case '10':
                moisString = 'octobre';
                break;
            case '11':
                moisString = 'novembre';
                break;
            default:
                moisString = 'décembre';
        }

        this.titre = 'Appel du ' +
            moment.unix(dateDebut).format('DD ') +
            moisString +
            moment.unix(dateDebut).format(' YYYY à HH:mm') +
            ' - salle ' + this.editedCreneau.salleId;
    }

    public onSlideChange(value, eleve) {
        if (value.checked === true) { // Eleve absent
            eleve.present = false;
        } else {
            eleve.present = true;
        }
    }

    public onActiveHomeboxP(value) {
    }

    onCancel() {
        this.router.navigate(['/profile']);
    }

    redirectMessageUser(idUtilisateur: number) {
        this.router.navigate(['messages/' + idUtilisateur]);
    }
}
