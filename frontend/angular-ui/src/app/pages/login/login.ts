import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private router: Router
  ) {}

  login() {

    if (
      this.email === 'admin@keyshell.com' &&
      this.password === 'admin123'
    ) {

      this.router.navigate(['/dashboard']);

    } else {

      alert('Invalid Credentials');

    }

  }

}