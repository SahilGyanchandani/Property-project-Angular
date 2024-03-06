import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from 'src/models/IUsers';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  addUserForm !: FormGroup;
  users!: IUsers; // Array to store multiple user data
  constructor(private router: Router, private formBuilder: FormBuilder, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initAddUserForm();

  }

  initAddUserForm() {
    this.addUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cPassword: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10)]]
    }, { validator: this.passwordMatchValidator })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatchedPasswords: true };
    }
    else {
      return null;
    }
  }

  addUser() {
    if (this.addUserForm.valid) {
      const userData = {
        name: this.addUserForm.get('name')?.value,
        email: this.addUserForm.get('email')?.value,
        password: this.addUserForm.get('password')?.value,
        mobile: this.addUserForm.get('mobile')?.value
      };

      const savedUsers = localStorage.getItem('users');
      console.log(savedUsers);


      if (savedUsers) {
        const existingUsers = JSON.parse(savedUsers);

        const updatedUsers = [...existingUsers, userData];

        localStorage.setItem('users', JSON.stringify(updatedUsers));

        this.alertify.success('Congrats you are successfully registered');

      }
      else {
        localStorage.setItem('users', JSON.stringify([userData]));
        this.alertify.success('Congrats you are successfully registered');
      }
      this.addUserForm.reset();
    }
    else {
      // If the form is invalid, mark all fields as touched to show validation errors
      this.addUserForm.markAllAsTouched();
      this.alertify.error('Kindly provide the required fields');
    }
  }
}
