import {Injectable} from '@angular/core';
import {CourseSlot} from '../model/model.courseslot';
import {User} from '../model/model.user';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Moment} from 'moment';
import {Room} from '../model/model.room';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UtilisateurApi} from '../shared/sdk';
import {AuthGuard} from '../shared/auth.guard';
import {Utilisateur} from '../shared/sdk/models';
import {Creneau} from '../shared/sdk/models';


@Injectable()
export class CreneauService {

    private options = {
        headers: new Headers({'Content-Type': 'application/json'})
    };

    newCreneau: Creneau = {idCreneau: null, dateDebut: 0, dateFin: 0, professeurs: [], eleves: [], salle: null};

    constructor(private http: Http,
                private  httpClient: HttpClient,
                public router: Router) {
    }

    getSlot(idEtablissement: string, idCreneau: number) {
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau;
        return this.httpClient.get(environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau);
    }

    createSlot(debut: number, fin: number, eleves: Utilisateur[], profs: Utilisateur[],
               salle: Room, idEtablissement: string) {
        const newCreneau: CourseSlot = {
            idCreneau: null,
            dateDebut: 0, dateFin: 0,
            professeurs: [], eleves: [], salle: null
        };
        newCreneau.dateDebut = debut;
        newCreneau.dateFin = fin;
        newCreneau.eleves = eleves;
        newCreneau.professeurs = profs;
        newCreneau.salle = salle;
        this.postSlot(newCreneau, idEtablissement);
    }

    postSlot(newCreneau: Creneau, idEtablissement: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const body = JSON.stringify(newCreneau);
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux';
        this.http.post(
            url,
            body,
            options
        ).subscribe(res => {
            console.log(res);

                this.router.navigate(['/profile']);
        });
    }

    prepareEditedTimeSlot(idCreneau: number, debut: number, fin: number, eleves: Utilisateur[], profs: Utilisateur[],
                          salle: Room, idEtablissement: string) {
        const editedTimeSlot: Creneau = {idCreneau: null,
            dateDebut: 0, dateFin: 0,
            Utilisateurs: [], eleves: [], salle: null
        };
        editedTimeSlot.idCreneau = idCreneau;
        editedTimeSlot.dateDebut = debut;
        editedTimeSlot.dateFin = fin;
        editedTimeSlot.eleves = eleves;
        editedTimeSlot.professeurs = profs;
        editedTimeSlot.salle = salle;
      //  this.putSlot(editedTimeSlot, idEtablissement,);
       this.putSlot(editedTimeSlot, idEtablissement, idCreneau);
    }

    putSlot(editedCreneau: Creneau, idEtablissement: string, idCreneau: number) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const body = JSON.stringify(editedCreneau);
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau;
        this.http.put(
            url,
            body,
            options
        ).subscribe(res => {
            console.log(res.json()),
                this.router.navigate(['/profile']);
        });
    }

    deleteSelected(idEtablissement: string, id: number) {
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + id + '/';
        return this.http.delete(url).subscribe(res => console.log(res));
    }

    duplicateWeeksSelected(duplicatedAndSelectedWeeks: number[][], id: number) {
        const url = environment.API_URL + '/Etablissements/' + id + '/creneaux/duplication';
        return this.http.post(url, JSON.stringify(duplicatedAndSelectedWeeks), this.options);
    }
}
