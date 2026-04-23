import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  formError = '';
  loginData = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      this.formError = 'Username and password are required.';
      return;
    }
    this.formError = '';
    // Redirect to cremation-bookings-dashboard
    this.router.navigate(['/cremation-bookings-dashboard']);
  }
}
