import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HistoryComponent } from '../../components/history/history.component';

@Component({
  selector: 'app-personal-area',
  standalone: true,
  imports: [CommonModule, HistoryComponent],
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})

export class PersonalAreaComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userEmail = this.authService.currentEmail;
  }

  logout() {
    this.authService.clearUser();
    this.router.navigate(['/login']);
  }
}
