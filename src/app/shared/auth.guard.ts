import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UtilisateurApi } from './sdk/services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userApi: UtilisateurApi
  ) { }

  canActivate() {
    if (this.userApi.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/access']);
      return false;
    }
  }
}

