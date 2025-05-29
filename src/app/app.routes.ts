import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { SearchCityComponent } from './pages/search-city/search-city.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map/map.component';

const InlineHomeComponent = Component({
  selector: 'app-inline-home',
  standalone: true,
  template: `<h1>Benvenuto nella Home!</h1>`
})(class {});

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-city', component: SearchCityComponent },
  { path: 'map', component: MapComponent }
];
