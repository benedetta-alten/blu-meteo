import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent {
  isLoggedIn = false;
  email = '';
  password = '';
  rememberMe = true;
  showPassword = false;

  login() {
    if (this.email && this.password) {
      this.isLoggedIn = true;
      if (this.rememberMe) {
        localStorage.setItem('login-email', this.email);
        localStorage.setItem('login-password', this.password);
        setTimeout(() => {
          localStorage.removeItem('login-email');
          localStorage.removeItem('login-password');
        }, 86400000); // 24 ore
      }
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
