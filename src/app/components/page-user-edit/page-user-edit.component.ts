import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { User} from "../../model/model.user";
import { Router} from "@angular/router";
import { AppComponent} from "../../app.component";
import { AuthService} from "../../services/auth.service";
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { UserService } from '../../services/user.service';
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
   
  editedUser: User;

   currentUser: User;
   administrateur: boolean;
   typeUtilisateur:string;
   idUtilisateur: number;
   editUserForm: FormGroup;
   //utilisateurs: Observable<User>;

  constructor(
    public authService: AuthService, 
    public router: Router,
    public http: Http,
    public route: ActivatedRoute,
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) {

    // Vérif user Administrateur :
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }


    this.route.params.subscribe(params => {
      this.typeUtilisateur = params['type'];
      this.idUtilisateur = params['id'];}); 

      this.initUser();



  }

  ngOnInit() {

  //   this.editUserForm = this.formBuilder.group({
  //     nom: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
  //     prenom: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
  // });

  }

  initUser(){
    this.userService.getUser( this.typeUtilisateur, this.idUtilisateur)
      .map((value: User) => {this.editedUser = value;})
      .subscribe();
  }

  onReset() {
    this.initUser();
    console.log("Form reset!");
  }

  onSubmit() {
      console.log("Form Submitted!");
  }

  onSupress() {
    console.log("Form Suppress!");
}
}
