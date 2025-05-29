import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleLogin = new EventEmitter<void>();

  constructor(private router: Router) {}

  onLoginClick() {
    this.toggleLogin.emit();
  }

  onSearchClick() {
    this.router.navigate(['/search-city']);
  }

  goHome() {
    console.log('Navigazione home...');
    this.router.navigate(['/']);
  }

  goToMap() {
    this.router.navigate(['/map']); 
  }
}
