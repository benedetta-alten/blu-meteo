import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blu-meteo';
  showPersonalArea = false;
  isHomePage = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.restoreUserFromStorage(); 

    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const url = event.urlAfterRedirects;
      this.isHomePage = (url === '/' || url === '');
    }
    });
  }

  togglePersonalArea() {
    this.showPersonalArea = !this.showPersonalArea;
  }
}
