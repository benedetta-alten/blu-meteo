import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map/map.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HistoryComponent } from './components/history/history.component';
import { PersonalAreaComponent } from './pages/personal-area/personal-area.component';

const InlineHomeComponent = Component({
  selector: 'app-inline-home',
  standalone: true,
  template: `<h1>Benvenuto nella Home!</h1>`
})(class {});

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent },
  { path: 'personal-area', component: PersonalAreaComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];