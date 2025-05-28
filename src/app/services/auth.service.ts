import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class AuthService {
  private emailSource = new BehaviorSubject<string | null>(null);
  private lastAccessSource = new BehaviorSubject<string | null>(null);

  currentEmail$ = this.emailSource.asObservable();
  lastAccessDate$ = this.lastAccessSource.asObservable();

  setUser(email: string, lastAccess: string) {
    this.emailSource.next(email);
    this.lastAccessSource.next(lastAccess);

    localStorage.setItem('userEmail', email);
    localStorage.setItem('lastAccess', lastAccess);
  }

  clearUser() {
    this.emailSource.next(null);
    this.lastAccessSource.next(null);

    localStorage.removeItem('userEmail');
    localStorage.removeItem('lastAccess');
  }

  restoreUserFromStorage() {
    const email = localStorage.getItem('userEmail');
    const lastAccess = localStorage.getItem('lastAccess');

    if (email && lastAccess) {
      this.emailSource.next(email);
      this.lastAccessSource.next(lastAccess);
    }
  }

}
