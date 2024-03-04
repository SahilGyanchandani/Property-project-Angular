import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedInUser!: string;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  loggedIn(): string {
    this.loggedInUser = localStorage.getItem('token') || '';
    return this.loggedInUser;
  }
  loggedOut() {
    return localStorage.removeItem('token');
  }

  dropdownChanged(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'logout') {
      this.loggedOut();
      this.router.navigateByUrl('user-login');
    } else {
      // Handle other options as needed
    }
  }
}
