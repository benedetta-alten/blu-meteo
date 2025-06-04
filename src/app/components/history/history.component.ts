import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; 

interface SearchHistoryEntry {
  timestamp: Date;
  city: string;
  coordinates: { lat: number; lng: number };
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  standalone: true,  
  imports: [CommonModule, FormsModule, NgbPaginationModule]
})

export class HistoryComponent implements OnInit {

  allEntries: SearchHistoryEntry[] = [
    { timestamp: new Date('2025-06-01T12:00:00'), city: 'Paris', coordinates: { lat: 48.8566, lng: 2.3522 } },
    { timestamp: new Date('2025-06-02T15:30:00'), city: 'Berlin', coordinates: { lat: 52.52, lng: 13.405 } },
    { timestamp: new Date('2025-06-03T08:45:00'), city: 'Rome', coordinates: { lat: 41.9028, lng: 12.4964 } },
    { timestamp: new Date('2025-06-04T14:20:00'), city: 'Madrid', coordinates: { lat: 40.4168, lng: -3.7038 } },
    { timestamp: new Date('2025-06-05T17:00:00'), city: 'Vienna', coordinates: { lat: 48.2082, lng: 16.3738 } },
    { timestamp: new Date('2025-06-06T10:10:00'), city: 'Lisbon', coordinates: { lat: 38.7223, lng: -9.1393 } },
    { timestamp: new Date('2025-06-07T19:55:00'), city: 'Amsterdam', coordinates: { lat: 52.3676, lng: 4.9041 } },
    { timestamp: new Date('2025-06-08T11:40:00'), city: 'Brussels', coordinates: { lat: 50.8503, lng: 4.3517 } },
    { timestamp: new Date('2025-06-09T16:15:00'), city: 'Copenhagen', coordinates: { lat: 55.6761, lng: 12.5683 } },
    { timestamp: new Date('2025-06-10T13:05:00'), city: 'Helsinki', coordinates: { lat: 60.1695, lng: 24.9354 } },
  ];

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  filteredEntries: SearchHistoryEntry[] = [];

  sortDirection: 'asc' | 'desc' = 'desc';

  searchCoordinates = '';

  ngOnInit(): void {
    this.collectionSize = this.allEntries.length;
    this.updateView();
  }

  updateView() {
    const search = this.searchCoordinates.trim();

    let filtered = this.allEntries.filter(entry => {
      if (!search) return true;
      return entry.coordinates.lat.toString().includes(search) || entry.coordinates.lng.toString().includes(search);
    });

    filtered = filtered.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.timestamp.getTime() - b.timestamp.getTime();
      } else {
        return b.timestamp.getTime() - a.timestamp.getTime();
      }
    });

    this.collectionSize = filtered.length;
    this.filteredEntries = filtered.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updateView();
  }

  onPageChange(page: number) {
    this.page = page;
    this.updateView();
  }

  onSearchChange() {
    this.page = 1;
    this.updateView();
  }
}
