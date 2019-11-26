import { Component, OnInit } from '@angular/core';
import {User} from '../services/user';
import {UserService} from '../services/user.service';
import {SearchUserByName} from '../services/search-user-by-name';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  userList: User[] = [];
  constructor(private userService: UserService) { }
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
  }

  deleteUser(closeModalRef2: HTMLButtonElement) {
    this.userService.deleteUserById(this.userId).subscribe(
      result => {
        this.getListUser();
        closeModalRef2.click();
      }, error => {
        console.log(error);
      }
    );
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
}
