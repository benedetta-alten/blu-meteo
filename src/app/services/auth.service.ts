import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  
})
export class AuthService {  
  private emailSource = new BehaviorSubject<string | null>(null);
  private lastAccessSource = new BehaviorSubject<string | null>(null);

  currentEmail$ = this.emailSource.asObservable();
  lastAccessDate$ = this.lastAccessSource.asObservable();

  private registeredUsersKey = 'registeredUsers';

  constructor(private http: HttpClient) {
    this.restoreUserFromStorage();
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');;
  }

  get currentEmail(): string | null {
    return this.emailSource.value;
  }

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
    if (typeof window !== 'undefined' && window.localStorage) {
      const email = localStorage.getItem('userEmail');
      const lastAccess = localStorage.getItem('lastAccess');

      if (email && lastAccess) {
        this.emailSource.next(email);
        this.lastAccessSource.next(lastAccess);
      }
    }
  }

  getRegisteredUsers(): { email: string; password: string }[] {
    const usersJson = localStorage.getItem(this.registeredUsersKey);
    if (usersJson) {
      try {
        return JSON.parse(usersJson);
      } catch {
        return [];
      }
    }
    return [];
  }

  setRegisteredUsers(users: { email: string; password: string }[]) {
    localStorage.setItem(this.registeredUsersKey, JSON.stringify(users));
  }
}