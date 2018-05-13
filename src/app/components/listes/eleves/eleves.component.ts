import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {User} from "../../../model/model.user";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {AuthService} from "../../../services/auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ElevesComponent implements OnInit {
  currentUser: User;
  administrateur: boolean;
  errorMessage:string;
  idEtablissement: number;
  url: string;
  listEleve: Observable<any>;

  constructor(public authService: AuthService, public router: Router,private http: Http) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.idEtablissement = this.currentUser.idEtablissement;


    if (this.currentUser.privilege == "Administrateur"){
      this.administrateur = true;
    }

    this.url = AppComponent.API_URL+"/eleve/etablissement/"+this.currentUser.idEtablissement;
    this.listEleve = this.http.get(this.url).map((res: Response) => res.json());
    
  }

  ngOnInit() {  }

}