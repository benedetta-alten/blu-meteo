import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service';  
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,          
  imports: [CommonModule], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentEmail$: Observable<string | null>;
  lastAccessDate$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.currentEmail$ = this.authService.currentEmail$;
    this.lastAccessDate$ = this.authService.lastAccessDate$;
  }
}
