import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/model.user";
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {UserService} from "../../services/user.service";
import {UtilisateurApi} from '../../shared/sdk';
import {Utilisateur, AccessToken} from '../../shared/sdk/models';
import {AuthGuard} from '../../shared/auth.guard';


@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
    currentUser: Utilisateur;


    constructor(private userService: UtilisateurApi, public authService: AuthGuard) {
        this.currentUser = new Utilisateur();
        // this.currentUser = this.userService.getCurrent();

    }

    ngOnInit() {
    }


}
