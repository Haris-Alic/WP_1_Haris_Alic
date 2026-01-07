import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName = 'Guest';
  currentTheme = 'zelena';
  logoLoaded = false;

  ngOnInit(): void {
    // ✅ Sluša postMessage iz login.html
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://127.0.0.1:5500' && event.data.type === 'LOGIN') {
        const user = event.data.user;
        localStorage.setItem('ipiCurrentUser', JSON.stringify(user));
        this.userName = user.name;
        this.currentTheme = user.theme || 'zelena';
        console.log('✅ Primljen user:', user);
      }
    });

    // ✅ Provjeri localStorage na startu
    const currentUser = localStorage.getItem('ipiCurrentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userName = user.name;
      this.currentTheme = user.theme || 'zelena';
      console.log('✅ User iz localStorage:', user);
    }
  }
}
