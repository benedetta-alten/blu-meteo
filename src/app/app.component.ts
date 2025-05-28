import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PersonalAreaComponent } from './shared/personal-area/personal-area.component'; 
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PersonalAreaComponent, 
    NgIf,
    HttpClientModule 
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
