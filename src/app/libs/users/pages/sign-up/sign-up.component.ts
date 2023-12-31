import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email already exists';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth.signup(this.loginForm['name'].value,
    this.loginForm['email'].value,
    this.loginForm['password'].value).subscribe(
      {
        //next: (v) => console.log(v),
        error: (error) => {
        this.authError = true;
        if (error.status !== 409) {
          this.authMessage = 'Error in the Server, please try again later!';
           }
        },
        next: (user) => {
        this.authError = false;
        this.localstorageService.setToken(user['data'].accessToken);
        this.router.navigate(['/']);
        }
      }

    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
