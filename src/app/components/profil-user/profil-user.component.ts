import {Component, OnInit, ViewEncapsulation, IterableDiffers} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {AuthService} from "../../services/auth.service";
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {UserService} from '../../services/user.service';
import {UtilisateurApi} from '../../shared/sdk';
import {AuthGuard} from '../../shared/auth.guard';
import {Utilisateur} from '../../shared/sdk/models';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
    selector: 'app-profil-user',
    templateUrl: './profil-user.component.html',
    styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit {
    editedUser: Utilisateur = new Utilisateur();
    currentUser: Utilisateur;
    administrateur: boolean;
    typeUtilisateur: string;
    idUtilisateur: number;
    editUserForm: FormGroup;

    //utilisateurs: Observable<User>;

    constructor(
        public authService: AuthGuard,
        public router: Router,
        public http: Http,
        public route: ActivatedRoute,
        public userService: UtilisateurApi,
        private formBuilder: FormBuilder,
    ) {

        // Vérif user Administrateur :
        this.currentUser = this.userService.getCachedCurrent();
        if (this.currentUser.privilege == 'Administrateur') {
            this.administrateur = true;
            this.editedUser = this.currentUser;
        } else {
            this.userService.getUser(this.currentUser.privilege.toLowerCase(), this.currentUser.idEtablissement, this.currentUser.id)
                .map((value: Utilisateur) => {
                    this.editedUser = value;
                })
                .subscribe();
        }
    }

    ngOnInit() {

    }

    nReset() {
        this.router.navigate(['profile']);
    }

    onSubmit() {
        this.userService.putUser(this.editedUser.privilege.toLowerCase(), this.editedUser.idEtablissement, this.editedUser);


        console.log('Form Submitted!');
        this.router.navigate(['profile']);
    }

    onSupress() {
        if (confirm('Voulez-vous vraiment supprimer ' + this.editedUser.nom + ' ' + this.editedUser.prenom + ' ?')) {
            this.userService.deleteUser(this.typeUtilisateur, this.editedUser.idEtablissement, this.idUtilisateur);
            console.log('Form Suppress!');
            this.router.navigate(['liste/' + this.typeUtilisateur]);
        }
    }

    doTheBack() {
        window.history.back();
    }
}
