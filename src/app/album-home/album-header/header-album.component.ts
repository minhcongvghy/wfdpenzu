import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from '../../auth/auth-login-info';
import {Tag} from '../../model/tag';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../model/album';

@Component({
  selector: 'app-header-album',
  templateUrl: './header-album.component.html',
  styleUrls: ['./header-album.component.scss']
})
export class HeaderAlbumComponent implements OnInit {

  info: any;
  private loginInfo: AuthLoginInfo;
  private returnUrl: string;
  private tagList: Tag[];

  constructor(private authService: AuthService, private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,

  ) { }

  ngOnInit() {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId()
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';


  }



  logout() {
    this.token.signOut();
    this.router.navigateByUrl(this.returnUrl);
  }

  reloadPage() {
    window.location.reload();
  }

}
