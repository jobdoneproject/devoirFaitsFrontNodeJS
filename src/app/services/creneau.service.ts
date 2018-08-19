import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Creneau} from '../shared/sdk/models';


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

    getSlot(idEtablissement: string, idCreneau: string) {
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau;
        return this.httpClient.get(environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau);
    }

    createSlot(debut: number, fin: number, elevesCreneau, professeursCreneau, idSalle: string, etablissementId: string) {

        const newCreneau: Creneau = {
            idCreneau: null,
            dateDebut: 0,
            dateFin: 0,
            professeursCreneau: [],
            elevesCreneau: [],
            salleId: '',
            etablissementId: ''
        };
        newCreneau.elevesCreneau = elevesCreneau;
        newCreneau.professeursCreneau = professeursCreneau;
        newCreneau.dateDebut = debut;
        newCreneau.dateFin = fin;
        newCreneau.salleId = idSalle;
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

    prepareEditedTimeSlot(idCreneau: string, debut: number, fin: number, eleves, profs, idSalle: string, idEtablissement: string) {
        const editedTimeSlot: Creneau = {
            idCreneau: null,
            dateDebut: 0, dateFin: 0,
            salleId: '',
            professeursCreneau: [],
            elevesCreneau: [],
            etablissementId: ''
        };
        editedTimeSlot.idCreneau = idCreneau;
        editedTimeSlot.dateDebut = debut;
        editedTimeSlot.dateFin = fin;
        editedTimeSlot.salleId = idSalle;
        //  this.putSlot(editedTimeSlot, idEtablissement,);
        this.putSlot(editedTimeSlot, idEtablissement, idCreneau);
    }

    putSlot(editedCreneau: Creneau, idEtablissement: string, idCreneau: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        const body = JSON.stringify(editedCreneau);
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + idCreneau;
        this.http.put(
            url,
            body,
            options
        ).subscribe(res => {
            console.log(res.json());
                this.router.navigate(['/profile']);
        });
    }

    deleteSelected(idEtablissement: string, id: string) {
        const url = environment.API_URL + '/Etablissements/' + idEtablissement + '/creneaux/' + id + '/';
        return this.http.delete(url).subscribe(res => console.log(res));
    }

    duplicateWeeksSelected(duplicatedAndSelectedWeeks: number[][], id: number) {
        const url = environment.API_URL + '/Etablissements/' + id + '/creneaux/duplication';
        return this.http.post(url, JSON.stringify(duplicatedAndSelectedWeeks), this.options);
    }
}
