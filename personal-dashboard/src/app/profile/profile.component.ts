import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUser();
    
    window.addEventListener('storage', () => {
      this.loadUser();
    });
    
    window.addEventListener('message', (event) => {
      if (event.data.type === 'LOGIN') {
        this.loadUser();
      }
    });
  }

  loadUser(): void {
    const currentUser = localStorage.getItem('ipiCurrentUser');
    console.log('🔍 RAW localStorage:', currentUser);
    
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      this.cdr.detectChanges();
      console.log('✅ Parsed user:', this.user);
    } else {
      console.warn('❌ Nema currentUser');
      this.user = { 
        name: 'Guest', 
        email: 'N/A', 
        theme: 'zelena', 
        created: new Date().toISOString() 
      };
    }
  }

  logout(): void {
    localStorage.removeItem('ipiCurrentUser');
    window.location.href = 'http://127.0.0.1:5500/login.html';
  }
}
