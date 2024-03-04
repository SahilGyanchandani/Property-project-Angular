import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertify: AlertifyService, private auth: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  loginUser() {
    if (this.loginForm.valid) {
      const token = this.auth.authUser(this.loginForm.value);
      if (token) {
        localStorage.setItem('token', token.name);
        this.router.navigateByUrl('/');
        this.alertify.success('Login Successfully');
        this.loginForm.reset();
      }
      else {
        this.alertify.error('Login Failed');
      }
    }
    else {
      // If the form is invalid, mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
      this.alertify.error('Kindly provide the required fields');
    }
  }
}
