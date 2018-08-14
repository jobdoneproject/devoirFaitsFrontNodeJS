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
import {Salle} from '../shared/sdk/models';


@Injectable()
export class CreneauService {

    private options = {
        headers: new Headers({'Content-Type': 'application/json'})
    };

//   newCreneau: Creneau = {idCreneau: null, dateDebut: 0, dateFin: 0, professeursCreneau: [], elevesCreneau: [], salle: null};

    constructor(private http: Http,
                private  httpClient: HttpClient,
                public router: Router) {
    }

    getSlot(idEtablissement: string, idCreneau: number) {
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau;
        return this.httpClient.get(environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau);
    }

    createSlot( debut: number, fin: number, professeursCreneau, elevesCreneau, salle: Salle, etablissementId: string) {

       // @ts-ignore
        const newCreneau: Creneau = {};
        newCreneau.elevesCreneau = elevesCreneau,
        newCreneau.professeursCreneau = professeursCreneau,
        newCreneau.dateDebut = debut;
        newCreneau.dateFin = fin;
        newCreneau.salleId = salle;
        this.postSlot(newCreneau, etablissementId);
    }

    postSlot(newCreneau: Creneau, etablissementId: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const body = JSON.stringify(newCreneau);
        const url = environment.API_URL + '/Etablissements/' + etablissementId + '/creneaux';
        this.http.post(
            url,
            body,
            options
        ).subscribe(res => {
            console.log(res);

                this.router.navigate(['/profile']);
        });
    }

    prepareEditedTimeSlot(idCreneau: number, debut: number, fin: number, eleves, profs, salleId: Salle, idEtablissement: string) {
        const editedTimeSlot: Creneau = {
            id: null,
            idCreneau: null,
            dateDebut: 0, dateFin: 0,
            salleId: null,
            professeursCreneau: [],
            elevesCreneau: [],
            etablissementId: '',
            salle: null
        };
        editedTimeSlot.idCreneau = idCreneau;
        editedTimeSlot.dateDebut = debut;
        editedTimeSlot.dateFin = fin;
        editedTimeSlot.salleId = salleId;
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
