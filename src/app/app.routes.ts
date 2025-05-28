import { Routes } from '@angular/router';
import { Component } from '@angular/core';

// Componente inline semplice per la home page
const InlineHomeComponent = Component({
  selector: 'app-inline-home',
  standalone: true,
  template: `<h1>Benvenuto nella Home!</h1>`
})(class {});

export const routes: Routes = [
  { path: '', component: InlineHomeComponent }
];
