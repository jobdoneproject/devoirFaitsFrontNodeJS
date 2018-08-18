import {Component, OnInit, ViewEncapsulation, IterableDiffers} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {User} from '../../model/model.user';
import {Router, ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {EtablissementApi, UtilisateurApi} from '../../shared/sdk';
import {Utilisateur} from '../../shared/sdk/models';
import {EtablissementInterface} from '../../shared/sdk/models';
import {Etablissement} from '../../shared/sdk/models';
import {AuthGuard} from '../../shared/auth.guard';
import {Observable, Subscriber, Subscription, BehaviorSubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {Scope} from '@angular/core/src/profile/wtf_impl';
import {Subject} from 'rxjs/Subject';
import {SubscribeOnObservable} from 'rxjs/internal-compatibility';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import * as _ from 'underscore';
import {EleveClassesPipe} from '../../pipes/eleve-classes.pipe';

@Component({
    selector: 'app-liste-utilisateur',
    templateUrl: './liste-utilisateur.component.html',
    styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

    pipeClass: EleveClassesPipe = new EleveClassesPipe;
    typeUtilisateur: string;
    idUtilisateur: string;
    titrePage: string;
    currentUser: Utilisateur;
    currentEtablissement: EtablissementApi;
    isAdministrateur: boolean;
    idEtablissement: string;
    utilisateurs$: BehaviorSubject<Utilisateur[]>;
    filterDisponibles = [{nom: 'Oui', select: 'disponible', checked: true, value: true}, {
        nom: 'Non',
        select: 'indisponible',
        checked: true,
        value: false
    }];
    classeDisponibles = ['Toutes'];
    nomDisponibles = [];
    filterParClasse = 'Toutes';
    filterParNom: string;
    selectedUtilisateurs: Utilisateur[] = [];
    isSelected = false;
    actionDemandee: string;

    constructor(
        public authService: AuthGuard,
        public router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private userService: UtilisateurApi,
        private etablissementAPI: EtablissementApi,
        private location: Location,
    ) {

        this.route.params.subscribe(params => {
            this.typeUtilisateur = params['type'];
        });
        if (this.typeUtilisateur === 'eleve') {
            this.titrePage = 'Élèves';
        } else if (this.typeUtilisateur === 'professeur') {
            this.titrePage = 'Professeurs';
        }

        this.currentUser = this.userService.getCachedCurrent();
        this.idEtablissement = this.currentUser.numero_uai;


        if (this.currentUser.privilege === 'Administrateur') {
            this.isAdministrateur = true;
        }
            this.etablissementAPI.getUtilisateurs(this.currentUser.numero_uai, {where: {'privilege': this.typeUtilisateur}} ).subscribe(newUsers => {

            this.utilisateurs$ = new BehaviorSubject<Array<Utilisateur>>(newUsers);

            this.utilisateurs$.forEach(arrayClasseUtilisateur => {
                arrayClasseUtilisateur.forEach(utilisateur => {
                    if (this.classeDisponibles.indexOf(String(utilisateur.classeName)) === -1) {
                        this.classeDisponibles.push(utilisateur.classeName, '');
                        // Dynamically add a column to the model (added in memory because no need to data persist it
                        utilisateur['selected'] = false;
                    }
                });
            });

            this.utilisateurs$.forEach(arrayNomUtilisateur => {
                arrayNomUtilisateur.forEach(utilisateur => {
                    if (this.nomDisponibles.indexOf(utilisateur.nom) === -1) {
                        this.nomDisponibles.push(utilisateur.nom);
                    }
                });
            });
        });

    }

    ngOnInit() {


    }

    redirectEditUser(idUtilisateur: string) {
        this.router.navigate(['edition-utilisateur/' + this.typeUtilisateur + '/' + idUtilisateur]);
    }

    redirectNewUser() {
        this.router.navigate(['creation-utilisateur/' + this.typeUtilisateur]);
    }

    redirectImportUsers() {
        this.router.navigate(['import-' + this.typeUtilisateur + 's/']);
    }

    redirectMessageUser(idUtilisateur: number) {
        this.router.navigate(['messages/' + idUtilisateur]);

    }

    checked() {
        return this.filterDisponibles.filter(utilisateur => {
            return utilisateur.checked;
        });
    }

    onChangeClasse(optionDuMenu) {
        this.filterParClasse = optionDuMenu;
    }

    onChangeNom(optionDuMenu: string) {
        this.filterParNom = optionDuMenu;
    }

    onSelectAll(selection) {
        if (selection.checked) {
            this.utilisateurs$.forEach(utilisateurs => {
                utilisateurs.forEach(utilisateur => {
                    this.selectedUtilisateurs.push(utilisateur);
                });
            });
        } else {
            this.selectedUtilisateurs.splice(0, this.selectedUtilisateurs.length);
            this.utilisateurs$.forEach(utilisateurs => {
                utilisateurs.forEach(utilisateur => {
                    utilisateur['selected'] = false;
                });
            });
        }

        if (this.filterParClasse !== 'Toutes') {
            this.selectedUtilisateurs = this.selectedUtilisateurs.filter(s => s.classeName.includes(this.filterParClasse));
        }

        if (this.filterParNom != null) {
            let regex = new RegExp('.*' + this.filterParNom + '.*', 'i');
            this.selectedUtilisateurs = this.selectedUtilisateurs.filter(s => regex.test(s.nom));
        }
        console.log('longueur de this.selectedUtilisateurs.length' + this.selectedUtilisateurs.length);

        this.selectedUtilisateurs.forEach(utilisateur => {
            utilisateur['selected'] = false;
        });
    }

    updateDisponibilite(idUtilisateur) {
        this.userService.patchAttributes(this.typeUtilisateur, this.currentUser.numero_uai, idUtilisateur);
    }

    switchSelectedUtilisateur(selectedUtilisateur: Utilisateur, selection) {
        if (selection.checked) {
            this.selectedUtilisateurs.push(selectedUtilisateur);
        } else {
            const indexUtilisateur = this.selectedUtilisateurs.findIndex(u => u.id == selectedUtilisateur.id);
            if (indexUtilisateur >= 0) {
                this.selectedUtilisateurs.splice(indexUtilisateur, 1);
            }
        }
    }

    action(event) {
        this.actionDemandee = event;
    }

    actionsGroupees() {
        // const event = document.getElementById('selectAction').nodeValue;
        console.log(this.actionDemandee);
        if (this.actionDemandee === 'supprimer') {
            if (confirm('Voulez-vous vraiment supprimer ' + this.selectedUtilisateurs.length + ' ' + this.typeUtilisateur + '(s) ?')) {
              //  this.userService.deleteUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs);
                this.userService.deleteById(this.selectedUtilisateurs);

                this.etablissementAPI.getUtilisateurs(this.currentUser.numero_uai, {where: {'privilege': this.typeUtilisateur}} ).subscribe(newUsers => {
                    this.utilisateurs$.next(newUsers);
                });
                this.selectedUtilisateurs.splice(0, this.selectedUtilisateurs.length);
                this.isSelected = false;
            }
        }

        if (this.actionDemandee === 'disponible') {
            this.selectedUtilisateurs.forEach(utilisateur => {
                utilisateur.disponible = true;
                const newid = utilisateur.id;
                this.userService.updateAttributes(utilisateur.id, {'disponible': true});
            });


            // updateUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs);
        }

        if (this.actionDemandee === 'indisponible') {
            this.selectedUtilisateurs.forEach(utilisateur => {
                utilisateur.disponible = false;
                const newid = utilisateur.id;
                this.userService.updateAttributes(utilisateur.id, {'disponible': false});
            });


           // this.userService.updateUsers(this.typeUtilisateur, this.currentUser.idEtablissement, this.selectedUtilisateurs);

        }

        console.log('collect : ' + this.selectedUtilisateurs.length);

        console.log('action : ' + event);
        //document.forms["actiongroupee"].reset();
    }

}
