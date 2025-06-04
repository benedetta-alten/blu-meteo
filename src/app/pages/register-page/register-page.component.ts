import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  email = '';
  password = '';  
  showPassword = false;
  isRegistered = false;

  registeredUsers: { email: string; password: string }[] = [];
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.registeredUsers = this.authService.getRegisteredUsers();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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

    const newUser = { email: this.email, password: this.password };
    this.registeredUsers.push(newUser);
    this.authService.setRegisteredUsers(this.registeredUsers);

    this.authService.setUser(this.email, new Date().toISOString());
    this.isRegistered = true;

    this.router.navigate(['/personal-area']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.clearUser();
    this.isRegistered = false;
    this.email = '';
    this.password = '';
    this.router.navigate(['/login']);
  }
}