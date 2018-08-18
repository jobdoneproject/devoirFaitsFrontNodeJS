import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User} from '../../model/model.user';
import { Router} from '@angular/router';
import { AppComponent} from '../../app.component';
import { AuthService} from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { UserService } from '../../services/user.service';
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
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PageUserEditComponent implements OnInit {

  editedUser: Utilisateur;

   currentUser: Utilisateur;
   administrateur: boolean;
   typeUtilisateur: string;
   idUtilisateur: string;
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

    if (this.currentUser.privilege === 'Administrateur') {
      this.administrateur = true;
    }


    this.route.params.subscribe(params => {
      this.typeUtilisateur = params['type'];
      this.idUtilisateur = params['id'];
    });
    if (this.idUtilisateur !== null) {
      this.initUser();
    } else {
      this.newUser();
    }


  }

  ngOnInit() {

  }

    initUser(){
        this.userService.findById(this.idUtilisateur)
            .subscribe((value: Utilisateur) => {
              this.editedUser = value;
              console.log(value);
            }, (error) => {
                console.log(error);
            }, () => {
                console.log('Fini !');
            });
    }

  newUser() {
    this.editedUser = new Utilisateur();
    this.editedUser.numero_uai = this.currentUser.numero_uai;
    this.editedUser.nom = null;
    this.editedUser.prenom = null;
    this.editedUser.email = null;
    this.editedUser.classeName = null;
    this.editedUser.password = null;
    this.editedUser.telephone = null;
  }

  onReset() {
    // if (this.idUtilisateur != null){
    //   this.initUser();
    // } else {
    //   this.newUser();
    //   console.log('new user')
    // }
    this.router.navigate(['liste/' + this.typeUtilisateur]);
  }

  onSubmit() {
    if (this.idUtilisateur !== null) {
      this.userService.putUser(this.typeUtilisateur, this.editedUser.idEtablissement, this.editedUser);
    } else {
     // this.userService.postUser(this.typeUtilisateur, this.editedUser.idEtablissement, this.editedUser);
        this.userService.patchOrCreate(this.editedUser);
        }
      console.log('Form Submitted!');
      this.router.navigate(['liste/' + this.typeUtilisateur]);
  }

  onSupress() {
    if(confirm('Voulez-vous vraiment supprimer ' + this.editedUser.nom + ' ' + this.editedUser.prenom + ' ?')){
      this.userService.deleteById(this.idUtilisateur);
      console.log('Form Suppress!');
      this.router.navigate(['liste/' + this.typeUtilisateur]);
    }
  }

  doTheBack() {
    window.history.back();
  }
}
