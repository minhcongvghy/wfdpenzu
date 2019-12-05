import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../services/user.service';
import {SearchUserByName} from '../../model/search-user-by-name';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  userList: User[] = [];
  private returnUrl: any;
  private tokenUserId: string;
  constructor(private userService: UserService,
              private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router, ) {
    this.tokenUserId = this.token.getUserId();
  }
  userId: string;
  name: '';

  ngOnInit() {
    this.getListUser();
  }

  getListUser() {
    this.userService.getListUser().subscribe(
      result => {
        this.userList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  getUserId(id: string) {
    this.userId = id;

    console.log(this.tokenUserId , this.userId);
  }

  deleteUser(closeModalRef2: HTMLButtonElement) {
            // this.logout();
            // closeModalRef2.click();
    this.userService.deleteUserById(this.userId).subscribe(
      result => {
        if (this.userId == this.tokenUserId) {
                 this.logout();
        }
        this.getListUser();
        closeModalRef2.click();
      }, error => {
        console.log(error);
      }
    );
    console.log(this.tokenUserId , this.userId);


  }

  searchByName() {
    const user: SearchUserByName = {
      name: this.name
    };
    this.userService.searchUserByName(user).subscribe(
      result => {
        this.userList = result;
      }, error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.token.signOut();
    this.router.navigateByUrl('/login');
  }
}
