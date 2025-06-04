import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Output() toggleLogin = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  onLoginClick() {
    this.toggleLogin.emit();
  }

  goHome() {
    console.log('Navigazione home...');
    this.router.navigate(['/']);
  }

  goToMap() {
    console.log('Click su mappa');
    this.router.navigate(['/map']); 
  }

  goToLogin() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/personal-area']); 
    } else {
      this.router.navigate(['/login']);
    }
  }
}
