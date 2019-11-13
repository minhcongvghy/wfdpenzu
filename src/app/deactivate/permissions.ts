import {TokenStorageService} from '../auth/token-storage.service';
import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class Permissions {
  constructor(private token: TokenStorageService) {}

  canActivate(): boolean {
    if (this.token.getToken()) {
      return true;
    } else {
      return false;
    }
  }
}
