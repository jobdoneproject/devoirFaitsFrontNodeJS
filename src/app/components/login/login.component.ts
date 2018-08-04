import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Utilisateur, AccessToken } from '../../shared/sdk/models';
import { UtilisateurApi } from '../../shared/sdk/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user: Utilisateur = new Utilisateur();
  errorMessage: string;
  constructor(
      private userApi: UtilisateurApi,
      private router: Router) { }



  ngOnInit() {

  }

  login() {
      this.userApi.login(this.user).subscribe(
          (token: AccessToken) => this.router.navigate(['/profile']),
          err => alert(err.message)
      );
  }
}
