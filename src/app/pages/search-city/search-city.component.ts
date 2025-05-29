import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, debounceTime, distinctUntilChanged, map, of } from 'rxjs';

@Component({
  selector: 'app-search-city',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTypeaheadModule],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.css'
})
export class SearchCityComponent {
  model = new FormControl('');
  cities = [
    'Lisbona', 'Madrid',  'Parigi', 'Bruxelles', 'Amsterdam', 'Lussenburgo', 'Nicosia', 'Roma', 'La Valletta', 'Vienna', 'Berlino', 
    'Varsavia', 'Copenaghen', 'Stoccolma', 'Riga', 'Vilnius', 'Tallinn', 'Londra', 'Dublino', 'Bucarest', 'Atene', 'Zagabria', 'Lubiana', 
    'Budapest', 'Praga', 'Bratislava', 'Helsinki', 'Sofia'
  ];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? [] :
        this.cities.filter(v => v.toLowerCase().includes(term.toLowerCase())).slice(0, 10)
      )
    );

    onSubmit() {
    console.log('Hai cercato:', this.model.value);
  }
}