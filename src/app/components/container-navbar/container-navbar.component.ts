import { Component, OnInit } from '@angular/core';

//import { NavBarLinksService } from '../../services/nav-bar-links.service';
import {AuthService} from "../../services/auth.service";
import { AuthGuard } from '../../shared/auth.guard';
import {User} from "../../model/model.user";
import { Utilisateur, AccessToken } from '../../shared/sdk/models';
import {Router} from "@angular/router";
import * as $ from 'jquery';
import { map} from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {UtilisateurApi} from "../../shared/sdk";


@Component({
  selector: 'app-container-navbar',
  templateUrl: './container-navbar.component.html',
  styleUrls: ['./container-navbar.component.css']
})
export class ContainerNavbarComponent implements OnInit {

  nomEtablissement: String;
  etablissement: string;
  idEtablissement: string;
  currentUser: Utilisateur;
  administrateur: boolean;
  professeur: boolean;
  eleve: boolean;
  url:string;
  etablissements: Observable<any> ;

  constructor(private userService: UtilisateurApi, public authService: AuthGuard, public router: Router,private http: Http) {
    this.currentUser = this.userService.getCachedCurrent();
    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }else if (this.currentUser.privilege == 'Professeur'){
      this.professeur = true;
    }else{
      this.eleve = true;
    }
    // @ts-ignore
      this.etablissement = this.currentUser.numero_uai;
      console.log(this.currentUser);
      console.log('Etablissements: ' + this.currentUser.numero_uai);
    this.url = environment.API_URL + '/Etablissements/' + this.etablissement;
     this.etablissements = this.http.get(this.url).pipe(map((resp: Response) => resp.json()));

    this.etablissements.forEach(etablissement => {
      this.nomEtablissement = etablissement.nomEtablissement;

    });
  }

ngOnInit() {
    (function($) {
      'use strict';
      $(function() {
        $('[data-toggle="offcanvas"]').on("click", function() {
          $('.sidebar-offcanvas').toggleClass('active')
        });
      });
    })(jQuery);

  }

  // login out from the app
  logOut() {
    this.userService.logout()
      /*.subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });*/
    this.router.navigate(['/login']);
  }
}
