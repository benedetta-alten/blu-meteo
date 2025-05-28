import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PersonalAreaComponent } from './shared/personal-area/personal-area.component'; // Importa il componente
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PersonalAreaComponent,  // aggiungi qui il componente personal-area
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blu-meteo';

  showPersonalArea = false;

  togglePersonalArea() {
    this.showPersonalArea = !this.showPersonalArea;
  }
}
