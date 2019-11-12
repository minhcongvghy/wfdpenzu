import { Component, OnInit } from '@angular/core';
import {SignUpInfo} from '../auth/sign-up-info';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from "../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  returnUrl: string;
  constructor(private authService: AuthService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  signUp() {
    console.log(this.form);
    const signUpInfoForm = new SignUpInfo(this.form.name, this.form.username, this.form.email, this.form.password);

    this.authService.signUp(signUpInfoForm).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        alert('Register Successful !');
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
