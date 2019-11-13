import {Injectable} from '@angular/core';

import {ProfileUserComponent} from '../profile-user/profile-user.component';
import {Permissions} from './permissions';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";


@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(private permission: Permissions, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if (this.permission.canActivate()) {
      return this.permission.canActivate();
    } else {
      return this.router.parseUrl('/');
    }
  }
}
