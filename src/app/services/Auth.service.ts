import { Injectable } from '@angular/core';
import { ILoginUser } from 'src/models/lLoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: ILoginUser) {
    let userArray = [];
    const savedUser = localStorage.getItem('users');
    if (savedUser !== null) {
      userArray = JSON.parse(savedUser);
    }
    return userArray.find((u: { name: string; password: string; }) => u.name === user.name && u.password === user.password)

  }
}
