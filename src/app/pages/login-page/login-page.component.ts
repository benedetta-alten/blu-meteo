import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit, OnDestroy {
  intervalId: any;

  email = '';
  password = '';  
  isLoggedIn = false;  
  rememberMe = true;
  showPassword = false;

  registeredUsers: { email: string; password: string }[] = [];

  lastAccessDate: string | null = null;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.restoreUserFromStorage();

    this.loadUsers();

    this.intervalId = setInterval(() => {
      this.checkSessionTimeout();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadUsers() {
    this.registeredUsers = this.authService.getRegisteredUsers();
    if (this.registeredUsers.length === 0) {
      this.http.get<{email: string; password: string}[]>('assets/users.json').subscribe(users => {
        this.registeredUsers = users;
        this.authService.setRegisteredUsers(users);
      });
    }
  }

  checkSessionTimeout() {
    const lastLoginStr = localStorage.getItem('last-login');
    if (lastLoginStr) {
      const lastLogin = new Date(lastLoginStr);
      const now = new Date();

      if (now.getTime() - lastLogin.getTime() > 86400000) { 
        alert('Sessione scaduta, effettua nuovamente il login');
        this.forceLogout();
      }
    }
  }

  forceLogout() {
    this.isLoggedIn = false;
    this.clearLocalStorage();
    this.authService.clearUser();
    this.email = '';
    this.password = '';
    this.lastAccessDate = null;
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
          localStorage.removeItem('login-password');
        } else {
          this.clearLocalStorage();
        }

        this.authService.setUser(this.email, now.toISOString());
        this.password = '';
        this.router.navigate(['/personal-area']);

      } else {
        alert('Email o password errati');
      }
    }
  }
  
  clearLocalStorage() {
    localStorage.removeItem('login-email');
    localStorage.removeItem('login-password');
    localStorage.removeItem('last-login');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  switchToRegister() {
    this.router.navigate(['/register']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}