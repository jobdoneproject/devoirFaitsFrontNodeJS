import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../model/model.user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import {CreneauService} from '../../services/creneau.service';
import {UserService} from '../../services/user.service';
import {Room} from '../../model/model.room';
import {RoomService} from '../../services/room.service';
import {CourseSlot} from '../../model/model.courseslot';
import {Utilisateur} from '../../shared/sdk/models';
import {UtilisateurApi} from '../../shared/sdk';
import {EtablissementApi} from '../../shared/sdk';
import {AuthGuard} from '../../shared/auth.guard';


@Component({
    selector: 'app-page-creneau',
    templateUrl: './page-creneau.component.html',
    styleUrls: ['./page-creneau.component.scss']
})

export class PageCreneauComponent implements OnInit {

    selectedEleves: Utilisateur[] = [];
    selectedProfesseurs: Utilisateur[] = [];
    // selectedProfesseursBackup: User[] = [];
    selectedProfesseur: any;
    currentUser: Utilisateur;
    administrateur: boolean;
    errorMessage: string;
    listEleve: Observable<any>;
    listProfesseur: Observable<any>;
    @Input() date_creneau: any;
    @Input() heure_debut: any;
    @Input() heure_fin: any;
    nomAndClasses = [];
    filterParNom: String;
    titre: String;
    myControl: FormControl = new FormControl();
    filteredEleve: Observable<any[]>;
    allSalleEtb: Observable<any>;
    idEtablissement: string;
    selectedSalle: Room;
    // selectedSallePut: Room;
    selectedSallePut: string; // Changement fait par moi.
    selectedSalleId: string;
    idCreneau: string;
    editedCreneau: CourseSlot;
    salle: Room;
    creneauId: number;
    pageModeCreation: boolean;
    creneauEditedBackup: CourseSlot;
    completeDate: string;


    constructor(private roomsv: RoomService,
                private courseservice: CreneauService,
                public authService: AuthGuard,
                public router: Router,
                private userService: UtilisateurApi,
                private etablissementAPI: EtablissementApi,
                private route: ActivatedRoute,
                private creneauService: CreneauService) {


        this.currentUser = this.userService.getCachedCurrent();
        this.idEtablissement = this.currentUser.numero_uai;

        if (this.currentUser.privilege === 'Administrateur') {
            this.administrateur = true;
        }


        // this.listProfesseur = this.userService.getUsers("professeur", this.currentUser.idEtablissement);
        // this.listEleve =  this.userService.getUsers("eleve", this.currentUser.idEtablissement);
        this.listProfesseur = this.etablissementAPI.getUtilisateurs(this.currentUser.numero_uai, {where: {'privilege': 'professeur'}});
        this.listEleve = this.etablissementAPI.getUtilisateurs(this.currentUser.numero_uai, {where: {'privilege': 'eleve'}});


        this.listEleve.forEach(arrayNomUtilisateur => {
            arrayNomUtilisateur.forEach(utilisateur => {
                if (this.nomAndClasses.indexOf(utilisateur.nom) === -1) {
                    this.nomAndClasses.push(utilisateur.nom);
                }
            });
        });


        // EDITION CRENEAU
        if (this.route.snapshot.paramMap.get('id') !== null) {
            this.pageModeCreation = false;
            // this.idCreneau = parseInt(this.route.snapshot.paramMap.get('id'), 10);
            this.idCreneau = this.route.snapshot.paramMap.get('id');
            this.getSlot();

            // this.roomsv.getAll(this.currentUser.idEtablissement)
            // .subscribe( data =>{
            //   this.allSalleEtb = data;

            //   this.updateTitre(this.editedCreneau.dateDebut);

            //   this.allSalleEtb.forEach((salle) => {
            //     if(this.editedCreneau.salle.idSalle == salle.idSalle){
            //       this.selectedSalle = salle.idSalle;
            //     }
            //   });
            // });

            // CREATION CRENEAU
        } else {
            // console.log("création");
            this.pageModeCreation = true;
            this.titre = 'Nouveau créneau';

            this.roomsv.getAll(this.currentUser.numero_uai)
                .subscribe(data => {
                    this.allSalleEtb = data;
                });

            // Placeholder Date et heures
            const timeStamp = Date.now();
            const year = new Date(timeStamp).toLocaleDateString('fr-FR');
            const annee = this.removeChar(year, 0, 6);
            const mois = this.removeChar(this.removeChar(year, 5, 5), 0, 3);
            const jour = this.removeChar(year, 2, 8);
            this.date_creneau = annee + '-' + mois + '-' + jour;
            this.heure_debut = '16:00';
            this.heure_fin = '17:00';
        }
    }

    ngOnInit() {
    }

    updateTitre(dateDebut) {
        // Titre
        const titreDateMois = moment.unix(dateDebut).format('MM');
        // console.log(titreDateMois);
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

        // console.log(this.editedCreneau.dateDebut);
        this.titre = 'Créneau du ' +
            moment.unix(dateDebut).format('DD ') +
            moisString +
            moment.unix(dateDebut).format(' YYYY à HH:mm');


    }

    removeChar(str, startIndex, count) {
        return str.substr(0, startIndex) + str.substr(startIndex + count);
    }

    addEleveToSelected() {
        const eleveAdded = this.myControl.value;
        let doublon = false;
        this.selectedEleves.forEach(eleve => {
            if (eleve.id === eleveAdded.idUtilisateur) {
                doublon = true;
            }
        });
        if (!doublon) {
            // If eleveAdded ne contient pas property present, ajout avec true
            if (!eleveAdded.hasOwnProperty('present')) {
                eleveAdded.present = true;
            }
            this.selectedEleves.push(eleveAdded);
        }
        // Clear select option :
        (<HTMLInputElement>document.getElementById('selectedProfesseurs'))
            .value = 'Choisir un professeur';
    }

    addProfesseurToSelected(selectedProfesseur) {
        let doublon = false;
        this.selectedProfesseurs.forEach(professeur => {
            if (professeur.id === selectedProfesseur.idUtilisateur) {
                doublon = true;
            }
        });
        if (!doublon) {
            this.selectedProfesseurs.push(selectedProfesseur);
        }
        // Clear select option :
        (<HTMLInputElement>document.getElementById('selectedProfesseurs'))
            .value = '-1';
    }

    addSalleToSelected(value) {

        this.allSalleEtb.forEach((salle) => {
            if (value === salle.idSalle) {
                console.log('found Id : ' + value);
                this.selectedSallePut = salle.nomSalle;
                this.selectedSalleId = salle.idSalle;
            }
        });

    }

    majTitre() {
        this.titre = 'Création du créneau du ' + this.date_creneau.toString();
    }

    onSend() {
        this.courseservice.createSlot(
            moment(this.date_creneau + ' ' + this.heure_debut).unix(),
            moment(this.date_creneau + ' ' + this.heure_fin).unix(),
            this.selectedEleves,
            this.selectedProfesseurs,
            this.selectedSalleId,
            this.idEtablissement);
    }

    onEdit() {
        console.log('edit !');
        this.courseservice.prepareEditedTimeSlot(
            this.idCreneau,
            moment(this.date_creneau + ' ' + this.heure_debut).unix(),
            moment(this.date_creneau + ' ' + this.heure_fin).unix(),
            this.selectedEleves,
            this.selectedProfesseurs,
            this.selectedSallePut,
            this.idEtablissement);
    }

    onCancel() {
        this.date_creneau = undefined;
        this.heure_debut = undefined;
        this.heure_fin = undefined;
        this.selectedProfesseurs = undefined;
        this.selectedEleves = undefined;
        this.allSalleEtb = undefined;
    }

    onReInit() {
        // console.log(this.creneauEditedBackup.professeurs);
        // this.date_creneau = moment.unix(this.creneauEditedBackup.dateDebut).format("YYYY-MM-DD");
        // this.heure_debut =  moment.unix(this.creneauEditedBackup.dateDebut).format("HH:mm");
        // this.heure_fin =  moment.unix(this.creneauEditedBackup.dateFin).format("HH:mm");
        // this.selectedProfesseurs = this.creneauEditedBackup.professeurs;
        // this.selectedEleves = this.creneauEditedBackup.eleves;
        // let idSalleBackedUp:any = this.creneauEditedBackup.salle.idSalle;
        // this.selectedSalle = idSalleBackedUp;
        this.router.navigate(['/profile']);
    }

    onChangeNom(optionDuMenu) {
        this.filterParNom = optionDuMenu;
    }

    displayFn(user: User): string {
        // return user ? user.nom + " " + user.prenom : user.nom + " " + user.prenom;
        return null;

    }

    enleverEleve(eleve: Utilisateur) {
        const index: number = this.selectedEleves.indexOf(eleve);
        if (index !== -1) {
            this.selectedEleves.splice(index, 1);
        }
    }

    enleverProfesseur(professeur: Utilisateur) {
        const index: number = this.selectedProfesseurs.indexOf(professeur);
        if (index !== -1) {
            this.selectedProfesseurs.splice(index, 1);
        }
    }

    public getSlot() {
        this.creneauService.getSlot(this.idEtablissement, this.idCreneau)
            .subscribe((data: CourseSlot) => {
                this.editedCreneau = data;
                console.log(this.editedCreneau);
               // this.creneauId = data.idCreneau;
              //  this.editedCreneau.professeurs = data.professeurs;
                this.date_creneau = moment.unix(this.editedCreneau.dateDebut).format('YYYY-MM-DD');
                this.heure_debut = moment.unix(this.editedCreneau.dateDebut).format('HH:mm');
                this.heure_fin = moment.unix(this.editedCreneau.dateFin).format('HH:mm');
                this.selectedSallePut = this.editedCreneau.salleId;
                this.selectedProfesseurs = this.editedCreneau.professeursCreneau;
                this.selectedEleves = this.editedCreneau.elevesCreneau;

                // Backup edited Creneau
                this.creneauEditedBackup = this.editedCreneau;

                this.updateTitre(this.editedCreneau.dateDebut);

                // Salles : liste & selected in edition
                this.roomsv.getAll(this.currentUser.numero_uai)
                    .subscribe(data => {
                        this.allSalleEtb = data;

                        this.allSalleEtb.forEach((salle) => {
                            if (this.editedCreneau.salleId === salle.idSalle) {
                                this.selectedSalle = salle.idSalle;
                            }
                        });
                    });

            });
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

    goToChecklist() {
        this.router.navigate(['liste-appel/' + this.idCreneau]);
    }

}
