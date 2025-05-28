import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-personal-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit{
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  email = '';
  password = '';  
  isLoggedIn = false;
  rememberMe = true;
  showPassword = false;
  isRegistering = false;

  registeredUsers: { email: string; password: string }[] = [];

  lastAccessDate: string | null = null; 

  ngOnInit() {
    this.http.get<{email: string; password: string}[]>('assets/users.json').subscribe(users => {
      this.registeredUsers = users;

      const savedEmail = localStorage.getItem('login-email');
      const savedPassword = localStorage.getItem('login-password');
      const lastLoginStr = localStorage.getItem('last-login');

      if (savedEmail && savedPassword && lastLoginStr) {
        const lastLogin = new Date(lastLoginStr);
        const now = new Date();

        if (now.getTime() - lastLogin.getTime() < 86400000) {
          const user = this.registeredUsers.find(u => u.email === savedEmail && u.password === savedPassword);
        
          if (user) {
            this.email = savedEmail;
            this.password = savedPassword;
            this.rememberMe = true;
            this.isLoggedIn = true;
            this.lastAccessDate = lastLoginStr;
          } else {
            this.clearLocalStorage();
          }
        } else {
          this.clearLocalStorage();
        }
      }
    });
  }

  clearLocalStorage() {
  localStorage.removeItem('login-email');
  localStorage.removeItem('login-password');
  localStorage.removeItem('last-login');
}

  login() {
    if (this.email && this.password) {
      const user = this.registeredUsers.find(
        u => u.email === this.email && u.password === this.password
      );

      if (user) {
        this.isLoggedIn = true;

        const now = new Date();
        localStorage.setItem('last-login', now.toISOString());

        if (this.rememberMe) {
          localStorage.setItem('login-email', this.email);
          localStorage.setItem('login-password', this.password);
        } else {
          localStorage.removeItem('login-email');
          localStorage.removeItem('login-password');
          localStorage.removeItem('last-login');
        }

        this.authService.setUser(this.email, now.toISOString());

      } else {
        alert('Email o password errati');
      }
    }
  }
  

  logout() {
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    this.clearLocalStorage();
    this.lastAccessDate = null;
    this.authService.clearUser();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  switchToRegister() {
    this.isRegistering = true;
    this.email = '';
    this.password = '';
  }

  switchToLogin() { 
    this.isRegistering = false;
    this.email = '';
    this.password = '';
  }

  register() { 
    if (!this.email || !this.password) {
      alert('Inserisci email e password');
      return;
    }

    if (this.password.length < 8) {
      alert('La password deve contenere almeno 8 caratteri');
      return;
    }

    const emailExists = this.registeredUsers.some(u => u.email === this.email);
    if (emailExists) {
      alert('Questa email è già registrata');
      return;
    }

    this.registeredUsers.push({ email: this.email, password: this.password });
    alert('Registrazione completata con successo!');

    this.switchToLogin();
  }
}