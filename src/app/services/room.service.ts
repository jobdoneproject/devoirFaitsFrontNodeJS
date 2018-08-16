import {Injectable} from '@angular/core';
import {Room} from "../model/model.room";
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {UtilsService} from './utils.service';
import {HttpClient} from '@angular/common/http';
import {Url} from 'url';
import {environment} from '../../environments/environment';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    private options = {
        headers: new Headers({'Content-Type': 'application/json'})
    };
    private url: string;

    constructor(private http: Http) {
    }

    createNew(etablissementId: string, name: String) {
        this.url = environment.API_URL + '/Etablissements/' + etablissementId + '/Salles';
        // this.http.post(this.url, {"nom":name}).subscribe(res => console.log(res.json()));
        return this.http.post(this.url, {'nomSalle': name});
    }

    getAll(etablissementId: string): Observable<any> {
        this.url = environment.API_URL + '/Etablissements/' + etablissementId + '/Salles/';
        return this.http.get(this.url).pipe(map((resp: Response) => resp.json()));
    }

    getById(etablissementId: string, id: number) {
        this.url = environment.API_URL + '/Etablissements/' + etablissementId + '/Salles/' + id + '/';
        return this.http.get(this.url).pipe(map((resp: Response) => resp.json()));
    }

    deleteSelected(etablissementId: string, id: string) {
        this.url = environment.API_URL + '/Etablissements/' + etablissementId + '/Salles/' + id + '/';
        // return this.http.delete(this.url).subscribe(res => console.log(res.json()));
        return this.http.delete(this.url);
    }

    updateSelected(etablissementId: string, id: string, name: string) {
        const room: Room = {etablissementId: etablissementId, idSalle: id, nomSalle: name};
        this.url = environment.API_URL + '/Etablissements/' + etablissementId + '/Salles/' + id + '/';
        let body = JSON.stringify(room);
        this.http.put(this.url, body, this.options).subscribe(res => console.log(res.json()));
    }

    updateSelected2 (idEtablissement: string, id: string, name: string) {
        const room: Room = {etablissementId: idEtablissement, idSalle: id, nomSalle: name};
        this.url = environment.API_URL + '/Etablissements/' + idEtablissement + '/salles/' + id + '/';
        let body = JSON.stringify(room);
        return this.http.put(this.url, body, this.options );
    }
}
